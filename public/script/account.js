const search = document.getElementById('search');
const toSearch = document.querySelectorAll('.expense');

search.addEventListener('keyup',(event)=>{
    const value = event.target.value.toLowerCase();
    Array.from(toSearch).forEach(ex => {
        let title = ex.querySelectorAll(".title")[0].textContent;
        let index = title.toLowerCase().indexOf(value);
        if(index!=-1){
            ex.style.display = 'grid';           
        }else{
            ex.style.display = 'none';
        }
    });
});

const main = document.querySelector(".main")
main.addEventListener("click",(event)=>{
    const parent = event.target.parentNode;
    const id = parent.querySelector('.id').textContent;
    window.location = "/account/expense/" + id
})