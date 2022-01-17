export function getProductUrlByName(name: string, lang: string) {
  if (name) {
    const replacedName = name.replace(/ /g, '_').replace(/\//g, '.').replace(/\(/g, '--').replace(/\)/, '');
    return ((lang && lang !== 'global') ? `/${lang}/${replacedName}` : `/${replacedName}`);
  }
}

export function getProductNameByUrl(urlPath: string) {
  let productName = urlPath.replace(/_/g, ' ').replace(/\./g, '/');
  if (productName.includes('--')) {
    productName = productName.replace(/--/g, '(') + ')';
  }
  return productName;
}
