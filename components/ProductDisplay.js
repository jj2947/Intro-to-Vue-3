app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        },
        cart: {}
    },
    template:
        /*html*/
        `<div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <!-- image goes here -->
        <img :src="image" :class="[inStock ? '' : 'out-of-stock-img']">
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inStock > 10">In Stock</p>
        <p v-else-if="inStock <= 10 && inStock >0">Almost Sold Out!</p>
        <p v-else>Out of Stock</p>
        <p>{{ sale }}</p>
        <p>Shipping: {{ shipping }}</p>
        
        <product-details :details="details"></product-details>

        <div v-for="(variant, index) in variants" :key="variant.id" @mouseover="updateVariant(index)"
          class="color-circle" :style="{ backgroundColor: variant.color }">
        </div>
        <button class="button" :class="{ disabledButton: !inStock }":disabled="!inStock" v-on:click="addToCart">Add to Cart</button>
        <button class="button" :class="{ disabledButton: cart == 0 }":disabled="cart == 0" @click="removeFromCart">Remove Item</button>
      </div>
    </div>
    <review-list v-if="reviews.length" :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview"></review-form>
  </div>`,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            onSale: true,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 5 },
                { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 },
            ],
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.variants[this.selectedVariant].quantity--,
                this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        removeFromCart() {
            this.variants[this.selectedVariant].quantity++,
                this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
        },
        updateVariant(index) {
            this.selectedVariant = index
        },
        addReview(review) {
            this.reviews.push(review)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        sale() {
            if (this.onSale) {
                return this.brand + this.product + ' is on sale!'
            } else {
                return ''
            }
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return 2.99
        }
    }

})