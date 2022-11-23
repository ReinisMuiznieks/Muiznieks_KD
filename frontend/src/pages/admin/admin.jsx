import DisplayCards from "../../components/card/displayCards";
import CategoryForm from "../../components/categories/categoryForm";
import DisplayCategories from "../../components/categories/displayCategories";
import NavbarTop from "../../components/navbar/navbar";
import CardForm from "../../components/card/CardForm";

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
</>
    )
}

export default Admin;