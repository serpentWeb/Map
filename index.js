/* let persons = [
  {
    city: 'Münster',
    img: 'img/Vassalo.png',
    first_name: 'Valeria',
    last_name: 'Vassalo',
    position: '',
    birthday: '',
    email: '',
    mobile: '',
    fun_facts: ''
  },
  {
    city: 'Münster',
    img: '',
    first_name: 'Jörn',
    last_name: '',
    position: '',
    birthday: '',
    email: '',
    mobile: '',
    fun_facts: ''
  },
  {
    city: 'Münster',
    img: 'img/Stricker.png',
    first_name: 'Johannes',
    last_name: 'Stricker',
    position: 'Software Engineer',
    birthday: '14 Oktober 1990',
    email: 'stricker@bitside.de',
    mobile: '',
    fun_facts: 'Frühaufsteher, Kaffeeenthusiast, Korbjäger und neuerdings auch Windelwechsler.'
  },
  {
    city: 'Hamburg',
    img: '',
    first_name: 'Christian',
    last_name: 'Stepniak',
    position: 'Software Engineer',
    birthday: '21 September 1983',
    email: 'stepniak@bitside.de',
    mobile: '',
    fun_facts: 'Wahl-"Hamburger" (okay, Elmshorn, aber wer kennt schon Elmshorn?) aus der Kaiserstadt Aachen. Webentwickler am Tag, Musiker bei Nacht. Spieleenthusiast - egal ob online, offline, oder in abgelegenen Waldstücken. Verfüge über mehr Katzenhaare als Geld.'
  }
]; */

const config = {
  backendUrl: "http://localhost:6868"
}

const api = {
  getUsers: async () => {
    const response = await fetch(`${config.backendUrl}/users`);
    return await response.json();
  },
  addUser: async (user) => {
    await fetch(`${config.backendUrl}/users`, {
      method: 'POST',
      body: {
        ...user
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
  }, 
  deleteUser: async (id) => {
    await fetch(`${config.backendUrl}/users/${id}`, {
      method: 'DELETE',
    })
  }
}

document.getElementById("addUserForm").addEventListener("submit", async (e) => {
  e.preventDefault()
  const user = ["name", "email", "phone", "funFacts", "city", "tags"]
    .reduce((acc, value) => {
      return {
        ...acc,
        [value]: document.getElementById(value).value
      }
    }, {})

    await api.addUser(user)
})


const bundeslands = ['nrw', 'rheinland-pfalz', 'saarland']

const addEventListenersToCities = () => {
  bundeslands.forEach(bl => {
    try {
      document.getElementById(bl).addEventListener('mouseenter', () => {
        mun.style.display = "inline-flex";
      })
    } catch (error) {
      console.error(bl + " not found")
      console.error(err)
    }
  })
}


const main = async () => {
    addEventListenersToCities();

    const users = await api.getUsers();
    console.log(users)


    document.write(`<div id="muenster">`)

    document.write(`</div>`)

    let nrw = document.getElementById('nrw');
    let muenster = document.getElementById('muenster');
    let mun = document.getElementById('mun');

    // How can you intelligently put this into one condition in which a truth check?
    nrw.addEventListener('mouseenter', () => {
      mun.style.display = "inline-flex";
    })
    mun.addEventListener('mouseenter', () => {
      mun.style.display = "inline-flex";
    })

    mun.addEventListener('mouseleave', () => {
      mun.style.display = "none";
    })

    nrw.addEventListener('mouseleave', () => {
      mun.style.display = "none";
    })

    persons.forEach(person => {
      if (person.city === "Münster") {
        mun.insertAdjacentHTML('afterbegin', `<div class="person">
            <div class="person-img">
              <img src="${person.img}" alt="">
            </div>
            <div class="person-name">
              <span class="name"> ${person.first_name} </span>
            </div>
            <div class="person-arrow">
              <svg width="26" height="10" viewBox="0 0 26 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5 9.5L21 5L16.5 0.5" stroke="#D9D9D9"/>
                </svg>
            </div>
          </div>
        `);
      }
    });

}

main()