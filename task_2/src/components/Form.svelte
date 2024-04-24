<script lang="ts">
    import {onMount} from 'svelte'

    let inputOne:any;
    let inputTwo:any;
    let currencyOne:string ;
    let currencyTwo:string;
    let currencyRatesAPI:any;
    let price = 0

    onMount( ()=>{
        const get = async ()=>{
            try {
                const res = await fetch('https://v6.exchangerate-api.com/v6/a559267ecfea3096fb4f678b/latest/USD');
                 currencyRatesAPI = (await res.json()).conversion_rates;  
            } catch (error:any) {
                console.log(error.message)
            }
        }
        get()
    })

    
    function onChangePriceForOneInput(){
        const result = (currencyRatesAPI[currencyOne]/currencyRatesAPI[currencyTwo])*inputTwo
        if (result===0){
            inputOne = ''
        }else{
        
            inputOne = result.toFixed(2)
        }
    }

    function onChangePriceForTwoInput(){
        const price = inputOne/currencyRatesAPI[currencyOne]
        const result = price * currencyRatesAPI[currencyTwo]
        if (result===0){
            inputTwo = ''
        }else{
            inputTwo = result.toFixed(2)
        }
    }
</script>
  
  <main>  
    <form class="form">
     <section>
            <select bind:value={currencyOne} on:change={onChangePriceForOneInput}  class="select">
                <option selected>RUB</option>
                <option>USD</option>
                <option>EUR</option>
            </select>
            <label  for="numer">Сумма для конвертации</label>
            <input on:keyup={onChangePriceForTwoInput}  id="numer" type="number" bind:value={inputOne} class="input" placeholder="Введите сумму">
     </section>
     <section>
            <select bind:value={currencyTwo} on:change={onChangePriceForTwoInput} class="select">
                <option>RUB</option>
                <option selected>USD</option>
                <option>EUR</option>
            </select>
            <label for="numerTwo">Сумма для конвертации</label>
            <input on:keyup={onChangePriceForOneInput} id="numerTwo" type="number" bind:value={inputTwo}  class="input" placeholder="Введите сумму">
     </section>
    </form>
  </main>
  
  <style>
    section{
        border-radius: 10px;
        padding: 10px;
        background-color: darkgray;
    }
    
    label{
        font-weight: bolder;
        display: inline-block;
        margin-bottom: 10px;
    }
    .input{
    
        outline: none;
        border: none;
        width: 100%;
        box-sizing: border-box;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
        padding: 10px 5px;
        border-radius: 10px;
        border: none;

    }
    .select{
        outline: none;
        border: none;
        text-align: center;
        width: 100%;
        padding: 4px;
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: bold;
    }
    .form{
        display: flex;
        gap: 30px;
        padding: 20px 10px;
        border-radius: 10px;
        overflow: hidden;
        box-sizing: border-box;
        max-width: 800px;
        background-color: aqua;
        margin: 0 auto;;
    }
   
  </style>
  