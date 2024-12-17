const loadPhone = async (searchText) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones)
}

const displayPhones = phones => {
  // console.log(phones);
  // 1.  get the parent element
  const phoneContainer = document.getElementById('phone-container');
  // clear the input search field to get new results so that it clears phone container before adding new cards
  phoneContainer.textContent = '';
  phones.forEach(phone => {
    // console.log(phone);
    // 2 create a div
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card bg-white  border border-solid border-[#CFCFCF] rounded-lg`;
    // 3 set innerhtml
    phoneCard.innerHTML = `
      <figure class="mx-6 mt-6 p-10 bg-[#0D6EFD0D] ">
            <img
              src="${phone.image}"
              alt="Phone"
              class="rounded-lg " />
          </figure>
          <div class="card-body items-center text-center">
            <h2 class="card-title text-[#403F3F] font-poppins text-[25px] font-bold">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions">
              <button class="btn btn-info text-xl text-white font-poppins font-semibold">Show Details</button>
            </div>
          </div>
    `
    // 4 append child
    phoneContainer.appendChild(phoneCard)
  })
  
}

const handleSearch = () =>{
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  // console.log(searchText);
  loadPhone(searchText)

  
}

// loadPhone()
