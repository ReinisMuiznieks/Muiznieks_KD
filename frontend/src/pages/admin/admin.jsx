import DisplayCards from "../../components/card/displayCards";
import CardForm from "../../components/card/CardForm";
import CategoryForm from "../../components/categories/categoryForm";
import DisplayCategories from "../../components/categories/displayCategories";
import NavbarTop from "../../components/navbar/navbar";

function Admin() {



    return(
<>
<NavbarTop/>
<CardForm/>
<DisplayCards/>

<br/>
<br/>
<br/>
<br/>
<br/>

<CategoryForm/>
<DisplayCategories/>
</>
    )
}

export default Admin;