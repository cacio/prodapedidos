function MaskCnpjCpf(v:string){
    v = v.replace(/\D/g, "")

    if (v.length <= 11) {
      v = v.replace(/(\d{3})(\d)/, "$1.$2")
      v = v.replace(/(\d{3})(\d)/, "$1.$2")
      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    } else {
      v = v.replace(/^(\d{2})(\d)/, "$1.$2")
      v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      v = v.replace(/\.(\d{3})(\d)/, ".$1/$2")
      v = v.replace(/(\d{4})(\d)/, "$1-$2")
    }
    
    return v
  }

  function mphone(v:string) {
    var r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 10) {
      r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 5) {
      r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
      r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
      r = r.replace(/^(\d*)/, "($1");
    }
    return r;
  }

  function formatarCep(campo:string){
    var v=campo.replace(/D/g,"")                
    v=v.replace(/^(d{5})(d)/,"$1-$2") 
    return v;
  }


  function formataCampo(campo:string, Mascara:string) { 
    var boleanoMascara; 
    
    var exp = /\-|\.|\/|\(|\)| /g
    var campoSoNumeros = campo.toString().replace( exp, "" ); 

    var posicaoCampo = 0;    
    var NovoValorCampo="";
    var TamanhoMascara = campoSoNumeros.length;; 


      for(var i=0; i<= TamanhoMascara; i++) { 
              boleanoMascara  = ((Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".")
                                                      || (Mascara.charAt(i) == "/")) 
              boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) == "(") 
                                                      || (Mascara.charAt(i) == ")") || (Mascara.charAt(i) == " ")) 
              if (boleanoMascara) { 
                      NovoValorCampo += Mascara.charAt(i); 
                        TamanhoMascara++;
              }else { 
                      NovoValorCampo += campoSoNumeros.charAt(posicaoCampo); 
                      posicaoCampo++; 
                }              
        }      
     return NovoValorCampo;
    
}

  export {MaskCnpjCpf,mphone,formatarCep,formataCampo};