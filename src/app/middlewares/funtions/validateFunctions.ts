//Validation and CEP test
export function checkFullCEP(cep: string) {
  var re = /^\d{5}-\d{3}$/;
  var reControl = /^\d{8}$/;
  return re.test(cep) || reControl.test(cep);
}

//Validation and CEP test
export function checkFullCPF(cpf: string) {
  var re = /^\d{3}.\d{3}.\d{3}-\d{2}$/
  var reControl = /^\d{11}$/
  return re.test(cpf) || reControl.test(cpf);
}