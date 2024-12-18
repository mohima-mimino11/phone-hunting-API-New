const loadPhone = async (searchText) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones)
}

const displayPhones = phones => {
  console.log(phones.length);
  // 1.  get the parent element
  const phoneContainer = document.getElementById('phone-container');
  // clear the input search field to get new results so that it clears phone container before adding new cards
  phoneContainer.textContent = '';
  // show all container
  const showAllContainer = document.getElementById('show-all-container');
  // display show all button if there are more than 6 phones
  if(phones.length > 6){
    showAllContainer.classList.remove('hidden');
  }else{
    showAllContainer.classList.add('hidden');
  }
  
  // display only 6 phones
  phones = phones.slice(0,6)
  phones.forEach(phone => {
    // console.log(phone);
    // 2 create a div
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card bg-white  border border-solid border-[#CFCFCF] rounded-lg h-[633px]`;
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
              <button class="btn bg-[#0D6EFD] text-xl text-white font-poppins font-semibold">Show Details</button>
            </div>
          </div>
    `
    // 4 append child
    phoneContainer.appendChild(phoneCard)
  })
  // hide loading spinner
  toggleLoadingSpinner(false);
  
}

const handleSearch = () =>{
  toggleLoadingSpinner(true)
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  // console.log(searchText);
  loadPhone(searchText)

  
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadigSpinner = document.getElementById('loading-spinner');
    if(isLoading){
      loadigSpinner.classList.remove('hidden')
    }else{
      loadigSpinner.classList.add('hidden')
    }
}

// loadPhone()
