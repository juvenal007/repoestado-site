export const FcEncrypted = (data) => {
	const usr = JSON.stringify(data);
	const b = btoa(usr).match(/(.{1,10})/g);
	const a = [];
	for (let i = 0; i < b.length; i += 1) {
		a.push(b[i]);
		a.push(btoa(b[b.length - (i + 1)]).replace(/=/g, ''));
	}
	const hash = btoa(btoa(a.join(';')));
	return hash;
};

export const FcDecrypted = (text) => {
	const str = text;
	let base64Encoded = atob(str);
	base64Encoded = atob(base64Encoded);
	const valores = base64Encoded.split(';');
	base64Encoded = '';
	for (let i = 0; i < valores.length; i += 2) {
		base64Encoded += valores[i];
	}
	return atob(base64Encoded);
};
