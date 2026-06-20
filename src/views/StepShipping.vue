<template>
  <div class="text-center">
    <div class="grey--text text--darken-2 font-weight-bold mb-4" style="font-size: 14px;">
      Select Shipping
    </div>
    
    <v-card outlined class="pa-4 mx-auto text-left" max-width="320" style="border-radius: 8px; border: 1px solid #cbd5e1;">
      <div class="d-flex justify-space-between align-center">
        <div>
          <div class="font-weight-bold blue-grey--text text--darken-3" style="font-size: 13px;">Standard Delivery</div>
          <div class="caption grey--text">2 - 3 business days</div>
        </div>
        <div class="font-weight-bold blue--text text--darken-2" style="font-size: 14px;">Ks 3,000</div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['formData']
}
</script>