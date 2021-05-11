class Column {
	constructor(obj)
	{
		this.name = obj.Field;
		this.required = obj.Null === 'YES';
		if (this.name === 'passwrd') {
			this.type = 'password';
		} else if ('/^int.*$/'.match(obj.Type)) {
			this.type = 'number';
			this.step = 1;
		} else if ('/^(float|double)$/'.match(obj.Type)) {
			this.type = 'number';
			this.step = 0.01;
		} else if ('/^date$/'.match(obj.Type)) {
			this.type = 'date';
		} else {
			this.type = 'text';
		}
	}
}

function parse_columns(cols)
{
	return cols.map(function (col) { return new Column(col); });
}
