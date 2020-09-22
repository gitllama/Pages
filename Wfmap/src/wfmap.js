const wfmap = require('./main.js')

var nodes = nodes === undefined ? document.querySelectorAll('.wfmap')
          : typeof nodes === 'string' ? document.querySelectorAll(nodes)
          : nodes instanceof window.Node ? [nodes]
          : nodes // Last case  - sequence config was passed pick next

for (let i = 0; i < nodes.length; i++) {
    const element = nodes[i]

    /*! Check if previously processed */
    if (!element.getAttribute('data-processed')) {
      element.setAttribute('data-processed', true)
    } else {
      continue
    }

    const id = `wfmap-${Date.now()}`
    try{
      let code = JSON.parse(element.innerHTML)
      element.innerHTML = ""
      wfmap.render(code, element);
    }catch(e){

    }
}
