export function isDefined(value, strict = true){
	if(!strict && value == 0) return true; //FIXME: handling 0 values
	return value && value !== null && typeof value !== 'undefined';
}
