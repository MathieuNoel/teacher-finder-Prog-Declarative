const app = {

  // Source unique de vérité
  state: {
    currentLanguage: 'JavaScript',
    currentSpeciality: 'React',
    languages: ['PHP', 'JavaScript', 'Rust'],
    specialities: ['WordPress', 'Data', 'Symfony', 'React'],
    teachers: [
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
      {
        name: 'John',
        language: 'Rust',
        speciality: 'Rocket-rs',
      }
    ]
  },

  // Met à jour le langage courant sélectionné
  setLanguage: (newLanguage) => {
    app.state.currentLanguage = newLanguage;
    app.update();
  },

  // Met à jour la spé courante sélectionnée
  setSpe: (newSpe) => {
    app.state.currentSpeciality = newSpe;
    app.update();
  },

  // Re-rend l'application avec les mises à jours
  update: () => {
    app.containerElement.innerHTML = '';
    app.init();
  },

  // Tableau contenant les profs filtrés d'après les selects
  filteredTeachers: [],

  // Initialise l'application
  init: function() {
    app.createFinder();
  },

  // Créer le contenu de l'application
  createFinder: () => {
    app.containerElement = document.querySelector('#app');
    app.createForm();

    // Filtre des formateurs d'après la spé et le langage courants (sélectionés)
    app.filteredTeachers = app.state.teachers.filter(teacher => {
      return (
        teacher.speciality === app.state.currentSpeciality
        && teacher.language === app.state.currentLanguage
      );
    });

    app.createCounter();
    app.createList();
    
    app.itemsElements = document.querySelectorAll('.list-item');
  },

  /**
   * Create, configure and insert a new HTML element
   * @param {string} tag - The name of the tag
   * @param {Element} parent - The parent element
   * @param {Object} attributes - The attributes to add to the new child element
   * @returns {Element} the new child element
   */
  configureElement: (tag, parent, attributes) => {
      const element = document.createElement(tag);
      for (const key in attributes) {
        // element['textContent'] = attributes['textContent']
        // element['value'] = attributes['value']
        // element['selected'] = attributes['selected']
        element[key] = attributes[key];
      }
      parent.appendChild(element);
      return element;
  },

  // Crée le formulaire contenant les selects
  createForm: () => {
    const formElement = app.configureElement('form', app.containerElement, { className: 'search' });

    const languageSelectElement = app.configureElement('select', formElement, { className: 'search-choices' })
    languageSelectElement.addEventListener('change', app.handleLanguageChange);

    const speSelectElement = app.configureElement('select', formElement, { className: 'search-choices' });
    speSelectElement.addEventListener('change', app.handleSpeChange);

    // Ajoute les options au select du langage
    app.state.languages.forEach(language => {
      app.configureElement('option', languageSelectElement, {
        textContent: language,
        value: language,
        selected: language === app.state.currentLanguage,
      });
    });

    // Ajoute les options au select de la spe
    app.state.specialities.forEach(speciality => {
      app.configureElement('option', speSelectElement, {
        value: speciality,
        textContent: speciality,
        selected: speciality === app.state.currentSpeciality,
      });
    });

  },

  // Crée le compteur
  createCounter: () => {

    const numbersOfTeachers = app.filteredTeachers.length;
    app.counterElement = app.configureElement('p', app.containerElement, {
      className: 'counter',
      textContent: app.getTitle(numbersOfTeachers),
    });

  },

  /**
   * Generates the title containing the counter
   * @param {number} number - teacher counter
   * @returns {string} - title
   */
  getTitle: (number) => {
    let title;
    if (number > 1) {
      title = `${number} profs trouvés`
    } else if( number === 1) {
      title = `Un prof trouvé`;
    } else {
      title = `Aucun prof trouvé`;
    }
    return title;
  },

  // Liste
  createList: () => {

    const listElement = app.configureElement('ul', app.containerElement, { className : 'list' });

    // Pour chaque prof filtré, crée un nouvel élément de liste dans le HTML
    app.filteredTeachers.forEach(app.createItem(listElement));
    // Version décomposée
    // app.state.teachers.forEach(teacher => {
    //   app.createItem(listElement)(teacher);
    // });

  },

  /**
   * Curry function - create a list item
   * @param {Element} listElement - Parent element of list item
   * @returns - Function creating list items from teacher objects
   */
  createItem: (listElement) => {

    // Retourne une fonction qui prend un prof en argument
    /**
     * @param {{
     *  name: string,
     *  language: string,
     *  speciality: string,
     * }}
     */
    return ({ name, language, speciality }) => {

      const itemElement = app.configureElement('li', listElement, {
        className: 'list-item',
        textContent: name,
      });
      app.configureElement('span', itemElement, {
        className: 'list-tag list-tag--language',
        textContent: language,
      });
      app.configureElement('span', itemElement, {
        className: 'list-tag list-tag--spe',
        textContent: speciality,
      });

    }

  },

  /**
   * Handle changing language selector
   * @param {Event} event 
   */
  handleLanguageChange: (event) => {
    
    const languageValue = event.target.value;
    app.setLanguage(languageValue);
    const speValue = event.target.nextElementSibling.value;
    // app.setSpe(speValue); => Inutile, ici, seul le langage change

    let counter = 0;

    app.itemsElements.forEach(itemElement => {

      const tag = itemElement.querySelector('.list-tag--language');
      const otherTag = itemElement.querySelector('.list-tag--spe');

      if (tag.textContent === languageValue && otherTag.textContent === speValue) {
        // Afficher
        itemElement.classList.remove('hidden');
        counter++;
      } else {
        // Masquer
        itemElement.classList.add('hidden');
      }

    });

    app.counterElement.textContent = app.getTitle(counter);
  },

  /**
   * Handle changing spe selector
   * @param {Event} event 
   */
  handleSpeChange: (event) => {

    const speValue = event.target.value;
    app.setSpe(speValue);
    const languageValue = event.target.previousElementSibling.value;
    // app.setLanguage(languageValue); => Inutile, ici seule la spe change

    let counter = 0;

    app.itemsElements.forEach(itemElement => {

      const tag = itemElement.querySelector('.list-tag--spe');
      const otherTag = itemElement.querySelector('.list-tag--language');

      if (tag.textContent === speValue && otherTag.textContent === languageValue) {
        // Afficher
        itemElement.classList.remove('hidden');
        counter++;
      } else {
        // Masquer
        itemElement.classList.add('hidden');
      }
    });

    app.counterElement.textContent = app.getTitle(counter);

  }

};

// on initialise l'app dès que le document est prêt
document.addEventListener('DOMContentLoaded', app.init);
