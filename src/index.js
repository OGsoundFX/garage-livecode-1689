const url = "https://garage.api.lewagon.com/do_loop/cars"
const list = document.querySelector(".cars-list")
const form = document.querySelector(".car-form")

// STEP 1
// Display all cars

const insertCar = (car) => {
  const carElement = `
        <div class="car">
          <div class="car-image">
            <img src="http://loremflickr.com/280/280/${car.brand}" />
          </div>
          <div class="car-info">
            <h4>${car.brand} ${car.model}</h4>
            <p><strong>Owner:</strong> ${car.owner}</p>
            <p><strong>Plate:</strong> ${car.plate}</p>
          </div>
        </div>`
  list.insertAdjacentHTML("beforeend", carElement)
}

const displayCars = () => {
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      data.forEach((car) => {
        insertCar(car)
      })
    })
}

displayCars()

// Step 2
// Post new cars

const displayNewCar = (event) => {
  event.preventDefault()
  
  const rawFormData = new FormData(form)
  const inputData = Object.fromEntries(rawFormData)
  
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(inputData)
  }

  fetch(url, options)
    .then(response => response.json())
    .then(data => insertCar(data))
  form.reset()
}

form.addEventListener("submit", displayNewCar)