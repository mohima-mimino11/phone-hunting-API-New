const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll)
}

const displayPhones = (phones, isShowAll) => {
  
  // 1.  get the parent element
  const phoneContainer = document.getElementById('phone-container');
  // clear the input search field to get new results so that it clears phone container before adding new cards
  phoneContainer.textContent = '';
  // show all container
  const showAllContainer = document.getElementById('show-all-container');
  // display show all button if there are more than 6 phones
  if(phones.length > 6 && !isShowAll){
    showAllContainer.classList.remove('hidden');
  }else if(phones.length === 0){
      const dataNotFound = document.createElement('div');
      dataNotFound.classList.add('mx-auto')
      dataNotFound.innerHTML = `
        <p class="text-[#403F3F] font-poppins text-3xl font-bold text-center">No Data Found! Please try again.</p>
      `;
      phoneContainer.appendChild(dataNotFound);
  }
  else{
    showAllContainer.classList.add('hidden');
  }
  
  // console.log('is show all', isShowAll);
  
  // display only 6 phones if showAll is false
  if(!isShowAll){
    phones = phones.slice(0,6)
  }
  phones.forEach(phone => {
    console.log(phone);
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
              <button id="show-details-btn" onclick="handleShowDetails('${phone.slug}'); show_details_modal.showModal()"  class="btn bg-[#0D6EFD] text-xl text-white font-poppins font-semibold">Show Details</button>
            </div>
          </div>
    `
    // 4 append child
    phoneContainer.appendChild(phoneCard)
  })
  // hide loading spinner
  toggleLoadingSpinner(false);
  
}

// handle show-details
const handleShowDetails = async (id) =>{
  // console.log('clicked show details', id);
  // load single phone data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data
  displayShowDetails(phone)
  
}

const displayShowDetails = (phone) => {
    console.log(phone);
    
    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = `
     <div class="mt-10 flex flex-col items-center gap-2 md:gap-3 lg:gap-5 ">
        <figure class=" p-10 bg-[#0D6EFD0D] rounded-lg">
          <img src="${phone.image}" alt="Phone" class="" />
        </figure>
        <div class="space-y-4">
          <h3 class="text-2xl font-bold text-[#403F3F]">${phone.name}</h3>
          <p class="text-xs text-[#706F6F]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
          <p class="text-sm text-[#403F3F] font-semibold">Storage: <span class="text-sm text-[#706F6F]">${phone?.mainFeatures?.storage}</span></p>
          <p class="text-sm text-[#403F3F] font-semibold">Display Size: <span class="text-sm text-[#706F6F]">
          ${phone?.mainFeatures?.displaySize}</span></p>
          <p class="text-sm text-[#403F3F] font-semibold">Chipset: <span class="text-sm text-[#706F6F]">${phone?.mainFeatures?.chipSet}</span></p>
          <p class="text-sm text-[#403F3F] font-semibold">Memory: <span class="text-sm text-[#706F6F]">
          ${phone?.mainFeatures?.memory}
          </span></p>
          <p class="text-sm text-[#403F3F] font-semibold">Slug: <span class="text-sm text-[#706F6F]">
          ${phone?.slug}
          </span></p>
          <p class="text-sm text-[#403F3F] font-semibold">Release Data: <span class="text-sm text-[#706F6F]">
          ${phone?.releaseDate}
          </span></p>
          <p class="text-sm text-[#403F3F] font-semibold">Brand: <span class="text-sm text-[#706F6F]">
          ${phone?.brand}
          </span></p>
          <p class="text-sm text-[#403F3F] font-semibold">GPS: <span class="text-sm text-[#706F6F]">
          ${phone?.others?.GPS || 'No GPS'}
          </span></p>
        </div>
         <div class="modal-action self-end">
          <form method="dialog" class="">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn ">Close</button>
          </form>
        </div>
     
     </div>
     
    
    
    `; 
}



// handle search btn for loading data from api to check when show-all is true
const handleSearch = (isShowAll) =>{
  toggleLoadingSpinner(true)
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  // console.log(searchText);
  loadPhone(searchText, isShowAll)

  
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadigSpinner = document.getElementById('loading-spinner');
    if(isLoading){
      loadigSpinner.classList.remove('hidden')
    }else{
      loadigSpinner.classList.add('hidden')
    }
}


// handle show all
const handleShowAll = () =>{
  handleSearch(true)
}

// loadPhone()
