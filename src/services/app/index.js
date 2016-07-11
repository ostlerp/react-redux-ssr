'use strict';


//helper method for determining if the app needs to fetch the property
export let needFreshData = (id, property) => {
  return id && (!property || property.fetching || Number(property.id) !== Number(id));
};

export let arraySingle = (array, key, val) => {
  if(Array.isArray(array)){
    let search = array.filter(item => item[key] === val);
    if(search && search.length === 1) {
      return search[0];
    }
  }

  return null;
};

export let formatPhone = (phone) => {
  if(!phone || !phone.replace) return phone;

  phone = phone.replace(/[^0-9]+/g, '');

  if(phone.length === 0){
    return null;
  } else if(phone.length <= 2){
    return `(${phone}`;
  } else if(phone.length === 3) {
    return `(${phone})`;
  } else if(phone.length <= 6) {
    return phone.replace(/(\d{3})(\d)/, "($1) $2");
  } else if(phone.length <= 9) {
    return phone.replace(/(\d{3})(\d{3})(\d)/, "($1) $2-$3");
  }

  return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
};

export let formatAddress = (address) => {
  if(!address) return '';

  return `${formatAddressLineOne(address)}, ${formatAddressLineTwo(address)}`;
};

export let formatAddressLineOne = (address) => {
  if(!address) return '';

  return `${address.street || ''}${address.street2 ? ' ' + address.street2 : ''}`;
}

export let formatAddressLineTwo = (address) => {
  if(!address) return '';

  let citystate = `${address.city || ''} ${address.state || ''}`;

  return `${citystate}${citystate && address.zip ? ', ' : ''}${address.zip || ''}`;
}

export let formatDollar = amount => {
  var n = parseFloat(amount) ? parseFloat(amount).toFixed(2) : 0.00;
  return `$ ${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};
