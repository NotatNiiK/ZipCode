<template>
  <div class="wrapper overflow-hidden min-h-screen flex flex-col">
    <header class="header py-3 bg-indigo-500 text-white">
      <div class="header__container max-w-6xl p-2.5 mx-auto">
        <div class="header__body flex justify-between items-center flex-wrap">
          <a href="#" class="header__logo text-2xl font-bold uppercase focus:outline-none">Zip Code</a>
          <button class="header__button p-2 bg-white text-indigo-500 py-2 transition-all duration-300 px-4 rounded text-lg hover:bg-gray-200 focus:outline-none "
            @click="getMoreIPinfo"
          >Get IP</button>
          <Transition>
              <div class="ip-popup fixed inset-0 flex justify-center items-center w-full h-full bg-black bg-opacity-80" v-if="isIpInfoOpen">
                <button class="ip-popup__close-btn fixed flex justify-center items-center p-3 w-12 h-12 text-lg font-bold rounded-full transition-all duration-300 hover:bg-red-500 bg-red-600 text-white top-14 right-14"
                  @click="isIpInfoOpen = false"
                >X</button>
                <div class="ip-popup__body w-10/12 md:max-w-screen-sm mx-auto h-96 rounded-md p-4 bg-white text-gray-800">
                  <h2 class="ip-popup__title font-bold text-center text-xl p-4">Detailed information about IP address</h2>
                  <template v-if='IpMoreInfo'>
                    <div class="ip-popup__item text-lg px-6 py-2"><strong>IP:</strong> {{ IpMoreInfo.query }}</div>
                    <div class="ip-popup__item text-lg px-6 py-2"><strong>City:</strong> {{ IpMoreInfo.city }}</div>
                    <div class="ip-popup__item text-lg px-6 py-2"><strong>Region:</strong> {{ IpMoreInfo.regionName }}</div>
                    <div class="ip-popup__item text-lg px-6 py-2"><strong>ISP:</strong> {{ IpMoreInfo.org }}</div>
                  </template>
                  <div class="ip-popup__error m-3 p-4 rounded text-white bg-red-600 text-center font-bold uppercase" v-else>{{ reserveMoreIpText }}</div>
                </div>
              </div>
          </Transition>
        </div>
      </div>
    </header>
    <main class="main py-20 flex-auto">
      <div class="main__container max-w-6xl p-3.5 mx-auto">
        <div class="main__body max-w-xl mx-auto uppercase">
          <form action="#" class="main__form form-main mb-4 " @submit.prevent>
            <div class="main__inputs flex">
              <input type="number" class="form-main__input inline-block flex-auto px-4 py-3 border-2 rounded border-indigo-500 outline-none transition-all duration-300 focus:shadow-md" placeholder="Enter zip code..."
                v-model="zipCode"
                @focus="inputFocus"
                @blur="inputBlur"
              />
              <button class="form-main__button bg-indigo-500 text-white ml-4 text-lg uppercase rounded px-6 py-3 transition-all duration-300 hover:bg-indigo-700 focus:bg-indigo-700 outline-none"
                @click="getInfoByZipCode"
              >Get</button>
            </div>
            <Transition>
              <div class="main__validation text-red-600 font-bold py-2" v-if="isValidationNotCorrect">Enter correct data!</div>
            </Transition>
          </form>
          <div class="main__result result-main py-6 normal-case text-lg bg-indigo-500 text-white rounded-lg p-4" v-if="cityData">
            <div class="result-main__item mb-3"><strong>Country: </strong> {{ cityData.country }}</div>
            <div class="result-main__item mb-3"><strong>State: </strong> {{ cityData.places[0].state }}</div>
            <div class="result-main__item mb-3"><strong v-if="httpReferrer">HTTP Referer: </strong> {{ httpReferrer }}</div>
            <div class="result-main__item mb-3"><strong v-if="IP">IP: </strong> {{ IP }}</div>
            <div class="result-main__item mb-3"><strong>User Agent: </strong> {{ userAgent }}</div>
          </div>
          <div class="main__loader my-10 flex items-center justify-center" v-if="isLoaderVisible && !isError && !isValidationNotCorrect">
            <span class="loader"></span>
          </div>
          <div class="main__error font-bold flex justify-center items-center text-white p-4 bg-red-600 rounded" v-if="isError">
             Error: {{ errorMessage }}
          </div>
        </div>
      </div>
    </main>
    <footer class="footer py-2 bg-indigo-500 text-white">
      <div class="footer__container max-w-6xl p-2 mx-auto">
        <div class="footer__body text-center">© 2023 ZIPCODE Corporation</div>
      </div>
    </footer>
  </div>
</template>

<script>
import { getAPIcall } from './api.js'
export default {
  name: 'App',
  data() {
    return {
      cityData: null,
      zipCode: '',
      httpReferrer: '',
      IP: null,
      userAgent: null,
      isLoaderVisible: false,
      isValidationNotCorrect: false,
      isError: false,
      isIpInfoOpen: false,
      errorMessage: '',
      IpMoreInfo: null,
      reserveMoreIpText: null
    }
  },
  computed: {
    zipCodeLength(){
      return new String(this.zipCode).length;
    }
  },
  mounted(){
    window.addEventListener('keyup', (event) => {
      if(event.key === 'Escape'){
        this.isIpInfoOpen = false;
      }
    })
    this.httpReferrer = document.referrer;
    this.userAgent = navigator.userAgent;
    const URL = `http://ip-api.com/json`;
    getAPIcall(URL).then(data => this.IP = data.query);
  },
  methods: {
    inputFocus(event){
      this.isLoaderVisible = false;
      this.isValidationNotCorrect = false;
      event.target.placeholder = '';
    },
    inputBlur(event){
      event.target.placeholder = 'Enter zip code...';
    },
    getInfoByZipCode(){
      this.isLoaderVisible = true;
      this.cityData = null;
      this.isError = false;
     if(this.zipCodeLength >= 5){
      const URL = `https://api.zippopotam.us/us/${this.zipCode}`
      getAPIcall(URL, (err) => {
        this.isError = true;
        this.errorMessage = err.message;
      }).then(data => { 
        if(data.country){
          this.cityData = data;
          this.isLoaderVisible = false;
        }
        else{
          this.isValidationNotCorrect = true;
        }
      });
     }
     else{
      this.isValidationNotCorrect = true;
     }
    },
    getMoreIPinfo(){
      this.isIpInfoOpen = true;
      const URL = `http://ip-api.com/json`;
      getAPIcall(URL, () => {
        this.reserveMoreIpText = 'Failed to get'
      }).then(data => this.IpMoreInfo = data);
    },
  },
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
.loader {
  width: 68px;
  height: 68px;
  border: 6px solid #6366f1;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
} 
</style>
