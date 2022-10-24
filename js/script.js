const app = {

  init: function() {

    app.furnishSubmit()

    app.evenListener()
    
  },

  updateList: (data) => {

    
    
    let title = document.querySelector('.title')

    title.innerText = `${data[0].length} ` + "profs trouvés"

    const list = document.querySelector('.found-container')

    let child = list.lastElementChild;  
    while (child) { 
        list.removeChild(child); 
        child = list.lastElementChild; 
    }

    for(let i = 0; i < data[0].length; i++) {

      let prof = document.createElement('div')

      prof.setAttribute('class', 'prof')

      list.appendChild(prof)

      let name = document.createElement('div')

      name.setAttribute('class', "profName")

      name.innerText = data[0][i].name

      let language = document.createElement('div')

      language.setAttribute('class', "profLanguage")

      language.innerText = data[0][i].language

      let speciality = document.createElement('div')

      speciality.setAttribute('class', "profSpeciality")

      speciality.innerText = data[0][i].speciality

      prof.appendChild(name)

      prof.appendChild(language)

      prof.appendChild(speciality)

    }    

  },

  evenListener: () => {

    document.addEventListener('change', (event) => {

      let newListLanguage = [] 

      let newListSpeciality = []            
      
          if(event.target.name === 'language' ) {
            
            newListLanguage.push(app.list.filter(el => el.language === event.target.value))
            
            app.updateList(newListLanguage)     
                        
          }

          if(event.target.name === 'speciality') {
            
            newListSpeciality.push(app.list.filter(el => el.speciality === event.target.value))          
            
            app.updateList(newListSpeciality)

          }          

      })    
    
  },

  onlyUnique:(value, index, self) => {

    return self.indexOf(value) === index;

  },

  furnishSubmit: () => {  

    const choice = app.list.map(el => el.language).filter(app.onlyUnique)

    const speciality = app.list.map(el => el.speciality).filter(app.onlyUnique)
     
    for(let j = 0; j < choice.length; j++) { 

      let submitLanguage = document.querySelector('.language')

      let option = document.createElement('option')

      option.innerText = choice[j]

      option.setAttribute("value", choice[j])

      submitLanguage.appendChild(option)

    }

    for(let k = 0; k < speciality.length; k++) { 

      let submitSpeciality = document.querySelector('.speciality')

      let option = document.createElement('option')

      option.innerText = speciality[k]

      option.setAttribute("value", speciality[k])

      submitSpeciality.appendChild(option)

  }},


  list: [
    {
      name: 'Loris',
      language: 'PHP',
      speciality: 'WordPress',
    },
    {
      name: 'Jean',
      language: 'JavaScript',
      speciality: 'Data',
    },
    {
      name: 'Jean-Christophe',
      language: 'PHP',
      speciality: 'Symfony',
    },
    {
      name: 'Jean-Philippe',
      language: 'PHP',
      speciality: 'Symfony',
    },
    {
      name: 'Julien',
      language: 'PHP',
      speciality: 'React',
    },
    {
      name: 'Vincent',
      language: 'JavaScript',
      speciality: 'React',
    },
    {
      name: 'Tony',
      language: 'JavaScript',
      speciality: 'React',
    },
  ]
};

// on initialise l'app dès que le document est prêt
document.addEventListener('DOMContentLoaded', app.init);