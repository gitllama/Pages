'use strict';

define([
  'react', 'App/actions', 'App/store', 'material-ui'
],  
(
  React,
  ActionType,
  Store,
  {Grid, Paper,Box,makeStyles}
)=>{

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      //padding: theme.spacing(2),
      textAlign: 'center',
      //color: theme.palette.text.secondary,
      height: 30,
      //width: 100,
      border: 1,
      m: 1,
      borderColor: 'text.primary',
      style: { width: '5rem', height: '5rem' },
    },
    box: {
      textAlign: 'left',
      height: 30,
      border: 1,
      borderColor: "#000000",
      style: { width: '5rem', height: '5rem' },
    },
    control: {
      //padding: theme.spacing(2),
    },
    sample:{
      img: {
       width : "100%",
       height : "100%",
      }
    },
  }));


  const asyncGetIssueFromNum = async (owner, repo, num, accessToken)=> {
    if(accessToken == undefined){
      let octokit = new Octokit();
      let issue = await octokit.issues.get({
        owner : owner,
        repo : repo,
        issue_number : num,
      });
      let comments = await octokit.issues.listComments({
        owner : owner,
        repo : repo,
        issue_number  : num,
      });
      return Object.assign({}, issue.data, {
        kanban : undefined,
        comments : {
          count : issue.data.comments,
          data : comments
        }
      });
    }else{
      let graphqlWithAuth = graphql.defaults({
        headers: {
          authorization: `token ${accessToken}`,
        }
      });
      let dst = await graphqlWithAuth(`{
        repository(owner: "${owner}", name: "${repo}") {
          issue(number: ${num}) {
            url
            body
            title
            comments(first: 100) {
              nodes {
                body
              }
            }
            projectCards {
              nodes {
                column {
                  name
                }
              }
            }
          }
        }
      }`);
      const src = dst.repository.issue;
      return Object.assign({}, src,{
        html_url : src.url,
        kanban : src.projectCards.nodes.length == 1 ? src.projectCards.nodes[0].column.name : undefined,
        comments : {
          count : src.comments.nodes.length,
          data : src.comments.nodes
        }
      });
    }
  }


  const CreateQR =({children})=> {
    const { state, dispatch } = React.useContext(Store);
    const ref =  React.useRef(null);
    const classes = useStyles();
    React.useEffect(() => {
      let unmounted = false;
      (async () => {
        const issue = await asyncGetIssueFromNum("gitllama", "Pages", 1, undefined);
        const json = {
          ver : '0.1',
          num : 1,
          title : issue.title,
          url : issue.url
        }
        if (!unmounted) {
          requirejs(['./Libs/QRCam/qrcode.min.js'],()=>{
            const qr = new QRCode(ref.current, {
              text: JSON.stringify(json),
              width: 128,
              height: 128,
              colorDark : "#000000",
              colorLight : "#ffffff",
              correctLevel : QRCode.CorrectLevel.H
            });  
          });
        }
      })();
      return (()=>{ unmounted = true; });
    }, []);
    return (  
      <Grid container className={classes.root} spacing={0}>
        <Grid xs={12} sm={9} item>
          <Box className={classes.box}>
            <div>AAA</div>
          </Box>
          <Box className={classes.box}>
            <div>BBB</div>
          </Box>
          <Box className={classes.box}>
            <div>CCC</div>
          </Box>
        </Grid>
        <Grid xs={12} sm={3} justify="center" item>
          <p className={classes.sample} ref={ref}/> 
        </Grid>
      </Grid>
    );
  }

  return CreateQR;
});

/*
        <section class={{ pageBreakAfter: always }}>
          
        </section>
*/