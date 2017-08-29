var CartItems = Backbone.Collection.extend({
  setTotal: function() {
    this.total = this.toJSON().reduce(function(a, b) {
      return a + b.price * b.quantity;
    }, 0);

    return this;
  },
  getTotal: function() { return this.total; },
  setQuantity: function() {
    this.quantity = this.toJSON().reduce(function(a, b) {
      return a + b.quantity;
    }, 0);

    return this;
  },
  getQuantity: function() {
    return this.quantity;
  },
  readStorage: function() {
    var stored_cart = JSON.parse(localStorage.getItem('cart'));
    this.reset(stored_cart);
    this.setTotal().setQuantity();
  },
  updateStorage: function() {
    localStorage.setItem('cart', JSON.stringify(this.toJSON()));
  },
  addItem: function(item) {
    var existing = this.get(item.get('id'));

    if (existing) {
      existing.set('quantity', existing.get('quantity') + 1);
    } else {
      existing = item.clone();
      existing.set('quantity', 1);
      this.add(existing);
    }
    this.add(item);
    this.setTotal().setQuantity().updateStorage();
    this.setQuantity();
    this.trigger('cart_updated');
  },
  destroy: function(id) {
    this.remove(id);
    this.setTotal().setQuantity().updateStorage();
  },
  initialize: function() {
    this.readStorage();
    this.on('destroy', this.destroy);
  }
});