<template>
  <div class="wrapper overflow-hidden min-h-screen flex flex-col">
    <header class="header py-3 bg-indigo-500 text-white">
      <div class="header__container max-w-6xl p-3.5 mx-auto">
        <div class="header__body flex justify-between items-center flex-wrap">
          <a href="#" class="header__link text-2xl font-bold uppercase">Zip Code</a>
          <button class="header__ip-btn p-2 bg-white text-indigo-500 py-2 transition-all duration-300 px-4 rounded text-lg hover:bg-gray-200">Get IP</button>
        </div>
      </div>
    </header>
    <main class="main py-24 flex-auto">
      <div class="main__container max-w-6xl p-3.5 mx-auto">
        <div class="main__body max-w-xl mx-auto uppercase">
          <form action="#" class="main__form mb-4 flex" @submit.prevent>
            <input type="number" class="main__input inline-block flex-auto px-4 py-3 border-2 rounded border-indigo-500 outline-none transition-all duration-300 focus:shadow-md" placeholder="Enter zip code..."
              v-model="zipCode"
              @focus="isValidationNotCorrect = false"
            />
            <button class="main__button bg-indigo-500 text-white ml-4 text-lg uppercase rounded px-6 py-3 transition-all duration-300 hover:bg-indigo-700 focus:bg-indigo-700 outline-none"
              @click="getInfo"
            >Get</button>
          </form>
          <Transition>
            <div class="main__validation text-red-600 font-bold py-2" v-if="isValidationNotCorrect">Enter data!</div>
          </Transition>
          <div class="main__result py-6 normal-case text-lg bg-indigo-500 text-white rounded-lg p-4" v-if="cityData">
            <div class="main__data mb-3"><strong>Country: </strong> {{ cityData.country }}</div>
            <div class="main__data mb-3"><strong>State: </strong> {{ cityData.places[0].state }}</div>
            <div class="main__data mb-3"><strong>HTTP Referer: </strong> {{ httpReferrer }}</div>
            <div class="main__data mb-3"><strong>User Agent: </strong> {{ userAgent }}</div>
          </div>
          <div class="main__errorr text-center text-red-600" v-if="isError">
              {{ errorMessage }}
          </div>
        </div>
      </div>
    </main>
    <footer class="footer py-2 bg-indigo-500 text-white">
      <div class="footer__container max-w-6xl p-3.5 mx-auto">
        <div class="footer__body text-center">© 2023 ZIPCODE Corporation</div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      cityData: null,
      zipCode: '',
      isValidationNotCorrect: false,
      isError: false,
      errorMessage: '',
      httpReferrer: '',
      userAgent: null
    }
  },
  methods: {
    async getInfo(){
      if(this.zipCode.length !== 0){
        try{
          const URL = `https://api.zippopotam.us/us/${this.zipCode}`;
          const request = await (await fetch(URL)).json();
          const result = await request;
          this.cityData = result;
        } catch(err){
          this.isError = true;
          this.errorMessage = err.message;
        }
      }
     else{
      this.isValidationNotCorrect = true;
     }
    }
  },
  mounted(){
    this.httpReferrer = document.referrer;
    this.userAgent = navigator.userAgent;
  }
}
</script>

<style>
*,
*::before,
*::after{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0; 
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
