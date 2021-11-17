import React,{ useState,useRef } from "react";
import { extract_category_brand_products_by_pageState,FilterByCategory_and_Subcategory } from "./Basic_initial_product_filters";
import { count_cylinder_products,count_year_section } from "./Count_Individual_selected_sections";

interface PriceSectionProps {
    extracted_category:string,
    extracted_subcategory:string,
    initial_product_list:any,
    pageState:string,
    // filters:any,
    callbackSendFilteredProductList?:any
}
// FilterByCategory_and_Subcategory = (productList:any,extracted_subcategory:string,pageState:string)
const products_that_contains_searched_categories = (initial_product_list:any,extracted_category:string,pageState:string,extracted_subcategory:string)=>{

   

   

     
        for(let categoryIndex = 0;categoryIndex < initial_product_list.length;categoryIndex++){

            const current_category_id = initial_product_list[categoryIndex].id;

            if(extracted_category.indexOf(current_category_id) !== -1){ 
                const current_category_data = initial_product_list[categoryIndex].data;

                const brands_available_obj = extract_category_brand_products_by_pageState(current_category_data,pageState);//category_object:any,pageState:string

                const filter_brands_available_subcategory = FilterByCategory_and_Subcategory(brands_available_obj,extracted_subcategory,pageState);//productList:any,extracted_subcategory:string,pageState:string


               
             return filter_brands_available_subcategory;
            }    

        }    

       
     
     
    

}


const make_price_string_a_number = (price:string)=>{
       
    const eliminate_currency_symbol = price.indexOf('from') ? price.split('from')[0].split(' ') : price.split(' ');
      const eliminate_dot = eliminate_currency_symbol[0].indexOf('.') !== -1? eliminate_currency_symbol[0].split('.').join('') : eliminate_currency_symbol[0];
      const eliminate_comma = eliminate_dot.indexOf(',') !== -1? eliminate_dot.split(',').join('') : eliminate_dot;
      const transform_string_into_number = Number(eliminate_comma);
      return transform_string_into_number;
 

  }

  const extract_prices_for_range = (products_that_contains_searched_section:any,sectionName:string,price_or_prices:string,productListType:string,use_filters?:any)=>{
    
   console.log('perfect cut',products_that_contains_searched_section,sectionName);


   

    let prices_range:{maximumPrice:string,minimumPrice:string,currencySymbol?:string} | null = null;
    let product_by_prices:any = {}; 


    const comapare_prices = (priceString:string,{productName,productValue}:{productName:string,productValue:any})=>{

            const current_price_number = make_price_string_a_number(priceString);
        
            if(priceString.indexOf('%') > -1 ) return null;
            console.log('price range is now ',prices_range)
 
            const add_to_the_same_price_key = ()=>{
               
                if( product_by_prices.hasOwnProperty(priceString)){
                    product_by_prices[priceString] = {...product_by_prices[priceString],...{[productName]:productValue}};
                    return;
                }

                product_by_prices[priceString] = {[productName]:productValue}
            }

            if(use_filters === undefined){

      
        
                    if(prices_range === null){
                        prices_range=  {minimumPrice:priceString,maximumPrice:priceString,currencySymbol:priceString.trim().split(' ')[1]};
                       
                        product_by_prices[priceString] = {[productName]:productValue}
                        return null;
                
                    }
                
                
                    if(current_price_number > make_price_string_a_number(prices_range.maximumPrice)){
                
                        prices_range.maximumPrice = priceString;

                        add_to_the_same_price_key();
                    
                       // product_by_prices[priceString] = {[productName]:productValue}
                    
                        return null;
                
                    }
                
                    if(current_price_number < make_price_string_a_number(prices_range.minimumPrice)){
                        prices_range.minimumPrice = priceString;
                      
                        add_to_the_same_price_key();
                       // product_by_prices[priceString] = {[productName]:productValue};
                    }

                    if(current_price_number === make_price_string_a_number(prices_range.minimumPrice) || current_price_number === make_price_string_a_number(prices_range.maximumPrice)){
                        add_to_the_same_price_key();
                        console.log('|||||||||||||||||||||||| 777777777777777777')
                    }

            }

            if(use_filters){ 

                const {userMinimumPrice,userMaximumPrice} = use_filters;

                if(prices_range === null){
                    prices_range=  {minimumPrice:priceString,maximumPrice:priceString,currencySymbol:priceString.trim().split(' ')[1]}
                    return null;
            
                }



            }
    
       }
  
    const price_range_extract:any = {

       price:{ 
        brand_level:()=>{




        for(const brandName in products_that_contains_searched_section){
            
            if(brandName.indexOf('_') === -1){
                const cylinderValues = products_that_contains_searched_section[brandName];

                for(const cylinderNameNum in cylinderValues){
                    const productsCylinder = cylinderValues[cylinderNameNum];


               loopThree:      for(const productName in productsCylinder){
                         const productValue = productsCylinder[productName];
                         const priceString = productValue['price'];

                          if(comapare_prices(priceString,{productName,productValue}) === null) continue loopThree;
                        //  const current_price_number = make_price_string_a_number(priceString);

                           
                        //     if(priceString.indexOf('%') > -1 ) continue;
                        //     console.log('price range is now ',prices_range)
                    
                        //     if(prices_range === null){
                        //     prices_range=  {minimumPrice:priceString,maximumPrice:priceString,currencySymbol:priceString.trim().split(' ')[1]}
                        //     continue;
                    
                        //     }
                        
                    
                        //     if(current_price_number > make_price_string_a_number(prices_range.maximumPrice)){
                    
                        //     prices_range.maximumPrice = priceString;
                            
                        //     continue;
                    
                        //     }
                    
                        //     if(current_price_number < make_price_string_a_number(prices_range.minimumPrice)){
                        //     prices_range.minimumPrice = priceString
                        //     }




                     }
                }
            }
             

        }
          
            
        return {prices_range,originalProductList:products_that_contains_searched_section,product_by_prices};
    
        },

        product_level:()=>{

        }
      },
      prices:{
        brand_level:()=>{
        console.log('prices obj looks like so',products_that_contains_searched_section)

          for(const brandName in products_that_contains_searched_section){
              const brandValue = products_that_contains_searched_section[brandName];

                 for(const productName in brandValue){
                     const productValue = brandValue[productName];
                     const prices_list_with_size = productValue['prices'];
                     console.log('we have balls',prices_list_with_size,'and balls',product_by_prices)

                    loopThree:  for(const sizeName in prices_list_with_size){
                                 const price_string = prices_list_with_size[sizeName];
                                 if(comapare_prices(price_string,{productName,productValue}) === null) continue loopThree;

                                }
                     // from the price list just take the smallest price of that product
                     // or to make a normal price range but every price will have an index that points to the product , or use a string name product
                      
                 }
          }
          return {prices_range,originalProductList:products_that_contains_searched_section,product_by_prices};
        },
        product_level:()=>{

        }



      } 
    }
    
   const result = price_range_extract[price_or_prices][productListType]()
   return result;

   }

   const split_by_from_word = (passed_price:string)=>{ 
       
    if(passed_price.indexOf('from') !== -1){
       const split_by_from = passed_price.split('from');
      
         return split_by_from[0].trim();
    }
    return passed_price
 }

   const price_range_spans_elements = (prices_obj_container:{minimumPrice:string,maximumPrice:string,currencySymbol:string})=>{// products_sections_obj.price or products_sections_obj.prices
    const {minimumPrice,maximumPrice} = prices_obj_container;

    

    

    return (
      <div className="available_price_range_display">
        <span className="minimum-available-price">{split_by_from_word(minimumPrice)}</span>
        <span className="line-between-minim-maxim-prices">-</span>
        <span className="maximum-available-price">{split_by_from_word(maximumPrice)}</span>
      </div>
    )

  }
 

  const return_filters_numbers = (filters:{chosenMinimumPrice:string | number,chosenMaximumPrice:string | number} | undefined)=>{
      if(filters === undefined) return undefined;
    const {chosenMinimumPrice,chosenMaximumPrice} = filters;

    const transform_to_number = (string_num:string | number)=> typeof string_num === 'string' ? make_price_string_a_number(string_num) : string_num

    const use_filters = {userMinimumPrice:transform_to_number(chosenMinimumPrice),userMaximumPrice:transform_to_number(chosenMaximumPrice)} 

    return use_filters;

  }// this one is use only to give back a set of products (do not calculate a range wth.. is pointless)
  
  const create_productList_by_chosen_price_range = (use_filters:{userMinimumPrice:number,userMaximumPrice:number},initial_product_list:any)=>{
        

      
  }







const PriceSection: React.FC<PriceSectionProps> = ({initial_product_list,pageState,callbackSendFilteredProductList,extracted_category,extracted_subcategory}) => {
  
    const products_that_match_categories = products_that_contains_searched_categories(initial_product_list,extracted_category,pageState,extracted_subcategory);
    const [filters_selected,setFilters_selected] = useState({chosenMinimumPrice:'',chosenMaximumPrice:''})
    
    const isPageState_Motorcycles = pageState.toLowerCase() === 'motorcycles';
    const price_or_prices = isPageState_Motorcycles? 'price' : 'prices'

   // const [priceRanges,setPriceRanges] = useState(extract_prices_for_range(products_that_match_categories,price_or_prices));// if filters is not undefined use return_filters_numbers

const filters = undefined
const use_filters = return_filters_numbers(filters);// filters can come from outside this function because the inputs are on the inside 



 const {prices_range,originalProductList,product_by_prices} = extract_prices_for_range(products_that_match_categories,price_or_prices,price_or_prices,'brand_level',use_filters)
    
 const selected_price_range = useRef({minimumPrice:prices_range.minimumPrice,maximumPrice:prices_range.maximumPrice})
  
     console.log('wake up','yea ...:(((',product_by_prices,prices_range)

   

//   const year_test =  count_year_section(products_that_match_categories,'brand_level');
//   const cylinder_test = count_cylinder_products(products_that_match_categories,'brand_level');

const order_price_object_keys = (prices_object:any)=>{
  
    const unordered_price_strings:string[] = [];

    for(const priceString in  prices_object){
        unordered_price_strings.push(priceString)
    }

 const sorted_prices =    unordered_price_strings.sort((a:string,b:string)=>make_price_string_a_number(a)-make_price_string_a_number(b));
 return sorted_prices;

}
const  price_strings_ordered = order_price_object_keys(product_by_prices);

  const add_price_option = (selectTypeInput:string,filters_selected:{chosenMinimumPrice:string,chosenMaximumPrice:string})=>{// for simplisiti sake make propertyes ''
     
   
    
    const {chosenMinimumPrice,chosenMaximumPrice} = filters_selected;

    

   
    const price_options_html_elements =  price_strings_ordered.map((priceString:string,indx:number)=>{
          
         const option_is_selected = chosenMinimumPrice === priceString || chosenMaximumPrice === priceString ? true : false;
         
        //   if(selectTypeInput === 'to' && indx === price_strings_ordered.length -1){

        //     return (
        //         <option className={`price-${selectTypeInput}-option`}
        //         selected={true}
        //          data-pricestringname={priceString} 
        //          data-selectedpriceoption={option_is_selected}
        //          value={priceString}
        //          >{split_by_from_word(priceString)}</option>

        //     )
        //   }
        return (
            <option className={`price-${selectTypeInput}-option`}
            
             data-pricestringname={priceString} 
             data-selectedpriceoption={option_is_selected}
             value={priceString}
             >{split_by_from_word(priceString)}</option>
        )
    })
        
       

          
          


    
  
    return price_options_html_elements
  }


  const sent_products_that_matches_selected_price_range = ()=>{
     
  
   let products_filtered:any = {}; 

const continue_loop_till_maximumPrice_selected = (price_ind:number)=>{

     for(let index = price_ind;index< price_strings_ordered.length;index++){
        const current_price =  price_strings_ordered[index];
        if(current_price === selected_price_range.current.maximumPrice){
            products_filtered = {...products_filtered,...product_by_prices[current_price]}
            break;
        }

        products_filtered = {...products_filtered,...product_by_prices[current_price]}

     }
}

 for(let price_ind = 0;price_ind < price_strings_ordered.length;price_ind++){
      const current_price =  price_strings_ordered[price_ind];
       if(current_price === selected_price_range.current.minimumPrice){
         
        products_filtered = {...products_filtered,...product_by_prices[current_price]}
        continue_loop_till_maximumPrice_selected(price_ind)
          
          break;
       }

 } 
  
 
//sectionNameThatWrites:string,productListResulted:any
 callbackSendFilteredProductList('price',products_filtered);
  }

  const edit_selected_price_range = ({target}:any)=>{
     const select_type = target.id;
     const option_value = target.value;
     
     if(select_type === 'minimumPrice'){
        selected_price_range.current.minimumPrice = option_value;
        sent_products_that_matches_selected_price_range();
        return;
     }
     if(select_type === 'maximumPrice'){
        selected_price_range.current.maximumPrice = option_value;
        sent_products_that_matches_selected_price_range();
     }


  }

  

     // auto refresh after 2 seconds if the user has write on both inputs , and the second input has a value bigger than a decent number

const options_from = add_price_option('from',filters_selected);
const options_to = add_price_option('to',filters_selected);






  

    return (  

        <>
            
            <div className="price-title-container">
                <div className="price-title">Price</div>
                
                {/* {price_range_spans_elements(priceRanges)} */}
                {/* {isPageState_Motorcycles && price_range_spans_elements(products_sections_obj.price)}
                {isPageState_Motorcycles !== true && price_range_spans_elements(products_sections_obj.prices)} */}
                
            </div>

            <div className="prices-available-container">
                <div className="available-prices-title-container">
                    Available Prices
                </div>
            {price_range_spans_elements(prices_range)}
            </div>
            
            <div className="price-inputs">
             <div className="price-select-title-container">Select Price Range</div>
       
          <div className="selectors-price-container">
                <select name="seletct_from_tag" id="minimumPrice" 
                 className="minimum-price" onChange={(event)=>{edit_selected_price_range(event)}}>
                
                {options_from}

                </select>

                <select name="seletct_to_tag" id="maximumPrice" className="maximum-price" onChange={(event)=>{edit_selected_price_range(event)}}
                defaultValue={options_to[options_to.length - 1].props.value}
                >
                
                {options_to}
                </select>

          </div>
           

                {/* <input className='smallerPrice' name='minimumPrice' type="text" placeholder='from'/>
                <input className='biggerPrice' name='maximumPrice' type="text"  placeholder='to'/> */}
            </div>
        </>
    );
}
 
export default PriceSection;