<template>
  <div class="wrapper overflow-hidden min-h-screen flex flex-col">
    <header class="header py-3 bg-indigo-400 text-white">
      <div class="header__container max-w-6xl p-3.5 mx-auto">
        <div class="header__body flex justify-between items-center flex-wrap">
          <a href="#" class="header__link text-2xl font-bold uppercase">Zip Code</a>
          <ul class="header__nav flex">
            <li class="header__item ml-4">
              <a href="#" class="header__link transition-all duration-300 hover:text-indigo-100">Pricing</a>
            </li>
            <li class="header__item ml-4">
              <a href="#" class="header__link transition-all duration-300 hover:text-indigo-100">About us</a>
            </li>
            <li class="header__item ml-4">
              <a href="#" class="header__link transition-all duration-300 hover:text-indigo-100">Contact us</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <main class="main py-24 flex-auto ">
      <div class="main__container max-w-6xl p-3.5 mx-auto">
        <div class="main__body">
          <form action="#" class="main__form flex justify-center" @submit.prevent>
            <input type="number" class="main__input inline-block px-4 py-3 border-2 w-96 rounded border-indigo-500 outline-none transition-all duration-300 focus:shadow-md" placeholder="Enter zip code..."
              v-model="zipCode"
            />
            <button class="main__button bg-indigo-500 text-white ml-4 text-lg uppercase rounded px-6 py-3 transition-all duration-300 hover:bg-indigo-700 focus:bg-indigo-700 outline-none"
              @click="getInfo"
            >Get</button>
          </form>
          <div class="main__result">
            <div class="main__country">Country: </div>
            {{ info }}
          </div>
        </div>
      </div>
    </main>
    <footer class="footer py-2 bg-indigo-400 text-white">
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
      info: null,
      zipCode: '',
    }
  },
  methods: {
    async getInfo(){
      const URL = `https://api.zippopotam.us/us/${this.zipCode}`;
      const request = await (await fetch(URL)).json();
      const result = await request;
      this.info = result;
    }
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
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
</style>
