class Cart {
	constructor()
	{
		this.products = [];
		this.trips = [];
		this.joyrides = [];
	}
}

// seperate functions and not methods to support serialization of object
function cart_isEmpty(cart)
{
	return !cart.products.length && !cart.trips.length &&
		!cart.joyrides.length;
}

function cart_total(cart)
{
	return cart.products.map(p => p.price).reduce((a, b) => a + b, 0)
		+ cart.trips.map(t => t.cost).reduce((a, b) => a + b, 0)
		+ cart.joyrides.map(j => j.cost).reduce((a, b) => a + b, 0);
}
