function setInfo(id, name, abr, now, now_val, prev, prev_val){
    let option =  document.querySelector('h1');
    option.innerHTML = id + ' - ' + name + ' ('+abr+')';

    let date =  document.getElementById('date');
    date.innerHTML = now+' - '+now_val;

    let prev_date =   document.getElementById('prev_date');
    prev_date.innerHTML = prev+' - '+prev_val;

}


fetch('https://www.cbr-xml-daily.ru/daily_json.js')
//обработка обычных ошибок
  .then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(new Error(response.statusText))
    }
    return Promise.resolve(response)
  })
  //возвращаем response
  .then(function (response) {
    return response.json()
  })
  //получаем данные из response
  .then(function (data) {
    const parsedData = data

    //читаем json в массив
    var result = [];
    for(var k in parsedData) {
        var v = parsedData[k];
        result.push(k, v);
    }

    //сохраняем массив валют в отдельную переменную
    var Valutes = result[9];
    // console.log(Valutes);  

    //флаг для заполнения первой карточки
    f=0;

    //проходимся по массиву валют, заполняя селектор
    for(obj in Valutes){
        if (f==0){
            //заполняем первую карточку
            var now_time = new Date(Date.parse(parsedData.Date));
            let now = now_time.getDate()+'/'+now_time.getMonth()+'/'+now_time.getFullYear()+', '+now_time.getHours()+':'+now_time.getMinutes()+':'+now_time.getSeconds();
            
            var now_time = new Date(Date.parse(parsedData.PreviousDate));
            let prev = now_time.getDate()+'/'+now_time.getMonth()+'/'+now_time.getFullYear()+', '+now_time.getHours()+':'+now_time.getMinutes()+':'+now_time.getSeconds();


            setInfo(Valutes[obj].ID, Valutes[obj].Name, obj, now, Valutes[obj].Value, prev, Valutes[obj].Previous)
        }
        f=1;
        document.querySelector('select').innerHTML += '<option value='+Valutes[obj].ID+'>'+Valutes[obj].ID+' - '+Valutes[obj].Name+'</option>\n';
    }

    //обработчик смены валюты в селекторе, почему же ты не работаешь??? (т–т)
        document.getElementById('selector').addEventListener('onchange', function(){
            console.log(document.getElementsByTagName('select')[0].value);
            for(obj in Valutes){
                if (Valutes[obj].ID ==  document.querySelector('select').value){
                    var now_time = new Date(Date.parse(parsedData.Date));
                    let now = now_time.getDate()+'/'+now_time.getMonth()+'/'+now_time.getFullYear()+', '+now_time.getHours()+':'+now_time.getMinutes()+':'+now_time.getSeconds();
                    
                    var now_time = new Date(Date.parse(parsedData.PreviousDate));
                    let prev = now_time.getDate()+'/'+now_time.getMonth()+'/'+now_time.getFullYear()+', '+now_time.getHours()+':'+now_time.getMinutes()+':'+now_time.getSeconds();

                    //заполняем карточку
                    setInfo(Valutes[obj].ID, Valutes[obj].Name, obj, now, Valutes[obj].Value, prev, Valutes[obj].Previous)
                }
            }
        })
        
  })
  //ловим ошибки и выводим в консоль
  .catch(function (error) {
    console.log('error', error)
  })


