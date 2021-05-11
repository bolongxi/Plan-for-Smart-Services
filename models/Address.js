class Address {
	constructor()
	{
		this.street = '';
		this.city = '';
		this.province = '';
		this.country = '';
	}
	
	verifyAddress()
	{
		for (var field of Object.keys(this)) {
			if (!this[field]) {
				return false;
			}
		}
		return true;
	}
	
	construct()
	{
		if (!this.verifyAddress()) {
			return null;
		}
		
		var str = '';
		for (var i = 0; i < Object.keys(this).length; i++) {
			if (i) {
				str += ', ';
			}
			str += this[Object.keys(this)[i]];
		}
		return str;
	}
}
