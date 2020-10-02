# サインを実装する

## jSignatureを使用する場合

https://willowsystems.github.io/jSignature/#/about/

```javascript
  $.getScript("/libs/jSignature.min.js", ()=>{
    for (var i of sign_array) {
      func(i);
      let f = $(`#issue_custom_field_values_${i}`);
      f.parent()
         .append(`<div style=\"width:640px;border:#000000 solid 1px;\" id=\"signature_${i}\"><div/>`)
         .append(`<input id =\"sign_reset_${i}\" type=\"button\" style=\"width:100px;\" value=\"Reset\">`);
      let f2 =  $(`#signature_${i}`);
      let f3 =  $(`#sign_reset_${i}`);

      f2.jSignature();

      f.hide();

      f2.bind('change', (e)=>{
        let s = f2.jSignature("getData"); //.jSignature("getData", "image/svg+xml");
        f.val(s);
      });

      f3.click(()=>{
          f2.jSignature("reset");
      });
    }

  });
```
  
## signature-pad
  
cdnjs.cloudflare.comからひっぱってこれるのでこちらの方が使いやすいかも

```javascript
function setSignature(func, sign_array){
  for (var i of sign_array) {
    func(i);
    let f = $(`#issue_custom_field_values_${i}`);
    f.parent()
       .append(`<canvas id=\"signature_${i}\" class="signature-pad" width="600" height="200" style="border: 1px solid black;"></canvas>`)
       .append(`<input id =\"sign_reset_${i}\" type=\"button\" style=\"width:100px;\" value=\"Reset\">`);

    let f2 =  $(`#signature_${i}`);
    let f3 =  $(`#sign_reset_${i}`);

    let signaturePad = new SignaturePad(f2[0], {
      onEnd : ()=>
      {
        let s = signaturePad.toDataURL("image/svg+xml");
        f.val(s);
      }
    });
    f.hide();
    f3.click(()=>{
      signaturePad.clear();
    });
  }
}
```
