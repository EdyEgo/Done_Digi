import React,{useState,useEffect} from 'react';
import { Link } from "react-router-dom";

export interface SearchListProps {
    searchText?:string,
    selectedCategory:string,
    categoryItems:any,
    pageState:string
}


const search_Text_Translate = (userText:any,pageState:any,categoryItems:any)=>{ 
    // this function returns an object {cylinderCapacity,motorcycle_Brand_Name,motorcycleName,equipment_Brand_Name,equipmentSize}

    // better to not return results for a nonsens string , is just a waste of resources
     
  let searchText = [...userText];

  const extract_cylinderCapacity = ()=>{
      // if after a series of numbers there is a space this funtion will stop 
     let cc:any = '';

   //  const copyText = [...searchText];
      
     if(searchText.length > 50) return null;// too many letters means a waste of time
      
      for(let i = 0;i<searchText.length;i++){
           if(isNaN(searchText[i - 1]) === false && searchText[i] === ' '){ 
          //  if(isNaN(cc[cc.length].trim()) === false && searchText[i] === ' '){ // you can see the last item because you if correnct you delete it


               break;
           } 
          
          if(!isNaN(searchText[i])){ 
              // if cc is longer than  4 letters then don t search for that cylinderCapacity
              cc = cc + searchText[i]; 
            //  searchText.splice(i,1);
          }
               
      } 

      return cc.trim();// now you can convert this one to a Number()

  }
  
  
 const extract_brand = (letterToIgnor?:string)=>{ 

    let brand:any = '';

    // const copyText = [...searchText]; 
    
     if(searchText.length > 50) return null;// too many letters means a waste of time
 

    // the brand must have at least the smallest number of letters in the collection brands (at least 3 letters) and

   const indexOfStart = letterToIgnor != undefined ? searchText.indexOf(letterToIgnor) + 1 : 0;

    for(let i = indexOfStart;i < searchText.length;i++){
        if(isNaN(searchText[i - 1]) === true && searchText[i] === ' '){  
      //  if(isNaN(brand[brand.length -1].trim()) === true && searchText[i] === ' '){
          //  searchText.splice(indexOfStart,i+1)
            break;
        } 
       
       if(isNaN(searchText[i])){
        brand = brand + searchText[i]; 
      //  searchText.splice(i,1);
       }
            
   } 

   return brand.trim();

 }
 
 
 const extract_size=(avaible_size:any)=>{ // search for the size in the string(you can slice the string so only some part of it is left,less to search)
    


 } 

 const extract_specific_product_name=()=>{  
    
    let list_Sub_brand_name = [];

    const brands_in_dataBase = ()=>{
        const pageStateCategories = categoryItems[pageState];

         if(Array.isArray(pageStateCategories) && pageStateCategories.length > 0){
              //  for(let i = 0;i<pageStateCategories - 1;i++){

              //  }

         }

    }
    


 }



// make one fnc that only extract that takes an argument , extract brand or number cc 

 const cylinderCapacity = extract_cylinderCapacity();
 
 const motorcycle_Brand_Name = pageState.toLowerCase() === 'motorcycles' ? extract_brand() : undefined;
 const equipment_Brand_Name = pageState.toLowerCase() === 'equipment' ? extract_brand() : undefined;

 const motorcycle_Sub_Brand =  motorcycle_Brand_Name != undefined || motorcycle_Brand_Name != null ? 
   extract_brand(motorcycle_Brand_Name[motorcycle_Brand_Name.length -1]) : undefined;

 const  equipmentSize =  equipment_Brand_Name != undefined || equipment_Brand_Name != null ? extract_size() : undefined;

 // depending on the page state from this function just some objects will be extracted!!!
return {cylinderCapacity,motorcycle_Brand_Name,motorcycle_Sub_Brand,equipment_Brand_Name,equipmentSize}// null on any of the objects means to many letters
  

}


// const search_Items: React.FC<SearchListProps> = ({searchText,selectedCategory,categoryItems,pageState})=>{
//     console.log(':\\',searchText,selectedCategory,categoryItems,pageState) 


    

// }


 // here we will take two props , the search text , and the selected category
 // ne ne ne we will need the page state and the categoryItems object
const SearchList: React.FC<SearchListProps> = ({searchText,selectedCategory,categoryItems,pageState}) => { 
     
    const [searchResults,setSearchResults] = useState()
   
    useEffect(()=>{



    },[searchText,selectedCategory]);

    return ( 
      <> 
      {}
        <Link to={'/nowhere'}></Link>
      </>
 );
}
 
export default SearchList; 








const search_Text_Translate_Alt = (userText:any,pageState:any,categoryItems:any)=>{
 // make sure to cover simpler words like helmets,helmet,glove/s etc 


 // if a string is not a brand(btw brands keys are upperCase) then it must be an sub name of a brand sooo you need a depeer search!!!!!!
   

   let copyUserText = [...userText]; 
  
    const copyCategoryItems_pageState =  categoryItems[pageState]// ex: equipmnet or motorcycles array
  
    const posibleBrand = userText

 //to keep things very simple , separate by space , example , if something is like so '125 honda' see witch one isNaN and search on cylidree for the numbers and 
 // on brands for what is not a number 
 

 const user_searched_for_a_category = (string_That_Is_NaN)=>{ // this one needs to be called first every time the use searches in all-categories section !!!
   // here take the categories , loop through them, and see if something mathes depending on the pageState , and add them plural
    
   const categories = categoryItems[pageState]

    for(let i = 0; i <= categories.length; i++){
        if(string_That_Is_NaN.toLowerCase() === categories[i].id.toLowerCase() || string_That_Is_NaN.toLowerCase() + 's' === categories[i].id.toLowerCase()){
           return {[`user_searched_for_this_category`]:categories[i]};
          break;
           
        }

    }


 }


   const find_brand_Object = (brand:string,categorySearched:string)=>{
 // if is not a brand it might be a name that is on a specific product on that brand
     if(Array.isArray(copyCategoryItems_pageState) && copyCategoryItems_pageState.length > 0 && categorySearched === 'all-categories'){
              for(let i = 0;i<copyCategoryItems_pageState.length -1;i++){ // array category
                  for (const [key, value] of Object.entries(copyCategoryItems_pageState[i].data)) { // make this one a single function that you can reuse with a more specific categori
                      if(key.toLowerCase() === brand.toLowerCase() && cylinderCapacity == undefined){
                        return {[`result_only_brand_${key}`]:value}
                        break;
                      } 
                      if(key.toLowerCase() === brand.toLowerCase() && cylinderCapacity && [key][cylinderCapacity] != undefined){
                        return {[`result_brand_plus_cylinderCapacity_${key}`]:[key][cylinderCapacity]};
                        break;
                      }

                  }
                 
              }

       return null;
     }
      

   }

 
  // if a brand returns null that might mean that the string is actually a sub name of a brand , to search fo all categories is gonna be umpf :)
  
  
  const find_subName_of_brand = (subName:string,categoryItems:any)=>{

      // lets make this one a recursion level 
  //  let subNameResult;
 
  //         const loop_through_object = (object_To_Loop,condition:any,key_to_match:string)=>{ // break at meeting the condition
  //     // go depper if there is something depper to search
  //     // if there is no condition go depper
  //               for(const [key, value] of  Object.entries(object_To_Loop)){
  //                     if(key_to_match.toLowerCase() === key.toLowerCase()  || condition === true){
  //                       subNameResult = {[`result_subName_${key}`]:value};
  //                       break;
  //                     }
                    
  // // calls itself to go depper
                          
  //               }
           
  //               if(typeof subNameResult !== 'object'){

  //               }
  //         }


      for(let i = 0;i<copyCategoryItems_pageState.length;i++){ // looping through array
             
              for(const [key, value] of  Object.entries(copyCategoryItems_pageState[i].data)){ // looping through 

                //loop_through_object(value,undefined,subName); // loop through 
                        
                console.log('loop',key,'|',value);   
              }
 

      }

       

  }





// IF IS A BRAND AND A CYLIDER NUMBER FIRST COMES THE BRAND THEN CYCLYCDER , SO IF YOU HAVE A NUMBER FIRST IDENTIFIE THAT THEN AFTER YOU HAVE MATCH ON THE BRAND JUST PUT THE CYCLIDER THERE


}



