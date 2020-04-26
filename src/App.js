import React, { Component, Fragment } from 'react';
import classes from './App.module.css';
import * as firebase from 'firebase';

import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import BackDrop from './components/Backdrop/Backdrop';
import SearchList from './components/SearchList/SearchList';
import SearchCount from './components/SearchCount/SearchCount';
import SelectProduct from './components/SelectedProduct/SelectedProduct';
import HeartPage from './assets/HeartPage/HeartPage';
import FrontPage from './assets/FrontPage/FrontPage';
// import CartPage from './assets/CartPage/CartPage';

// Side Drawer Pages
import KitchenPage from './components/KitchenPage/KitchenPage';
import ClothesPage from './components/ClothesPage/ClothesPage';
import KidsPage from './components/KidsPage/KidsPage';
import OfficePage from './components/OfficePage/OfficePage';
import PersonalPage from './components/PersonalPage/PersonalPage';
import MiscPage from './components/MiscPage/MiscPage';

firebase.initializeApp({
  apiKey: "AIzaSyBOPeDR45xbW-flNTwBv5XGyEMJstvzSKs",
  authDomain: "earthxhack-2592f.firebaseapp.com",
  databaseURL: "https://earthxhack-2592f.firebaseio.com",
  projectId: "earthxhack-2592f",
  storageBucket: "earthxhack-2592f.appspot.com",
  messagingSenderId: "525979922104",
  appId: "1:525979922104:web:3b37ef7ca18139eb17ce4d",
  measurementId: "G-25E5SPBH71"
})

let db = firebase.firestore();
const clothingGET = db.collection('Category').doc('Clothing');
const clothingCollect = ['Alternative Apparel', 'Boden', 'EcoVibe', 'Pact', 'People Tree', 'Reformation', 'We Are Thought'];
const kitchenGET = db.collection('Category').doc('Household & Kitchen');
const kitchenCollect = ['Bedroom', 'Cleaning', 'Food related'];
const kidsGET = db.collection('Category').doc('Kids');
const kidsCollect = ['Entertainment'];
const officeGET = db.collection('Category').doc('Office');
const officeCollect = ['Note Taking', 'Others', 'Utensils'];
const personalGET = db.collection('Category').doc('Personal Care');
const personalCollect = ['Bath', 'Beauty', 'Body'];
const miscGET = db.collection('Category').doc('Miscellaneous');
const miscCollect = ['Bags'];

// let storage = firebase.storage();

class App extends Component {
  state = {
    frontPageOpen: true,
    sideDrawerOpen: false,
    search: false,
    productSelected: false,
    cartPageOpen: false,
    heartPageOpen: false,

    /* Side Drawer */
    kitchenPageOpen: false,
    clothesPageOpen: false,
    kidsPageOpen:false,
    officePageOpen: false,
    personalPageOpen: false,
    miscPageOpen: false,

    queryKey: "",
    queryReturned: [],
    productInfo: {
      image: [],
      title: "",
      brand: "",
      des: "",
      price: "",
      rating:"",
      url: "",
    },
    heartPageObjects: [],
    cartPageObjects: []
  }

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !(prevState.sideDrawerOpen)};
    })
  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  }

  heartPageClickHandler = () => {
    this.setState({
      frontPageOpen: false,
      sideDrawerOpen: false,
      search: false,
      productSelected: false,
      cartPageOpen: false,
      heartPageOpen: true,
        /* Side Drawer */
      kitchenPageOpen: false,
      clothesPageOpen: false,
      kidsPageOpen:false,
      officePageOpen: false,
      personalPageOpen: false,
      miscPageOpen: false,
    })
  }
  
  /*
  cartPageClickHandler = () => {
    this.setState({
      frontPageOpen: false,
      sideDrawerOpen: false,
      search: false,
      productSelected: false,
      cartPageOpen: true,
      heartPageOpen: false,
      // Side Drawer
      kitchenPageOpen: false,
      clothesPageOpen: false,
      kidsPageOpen:false,
      officePageOpen: false,
      personalPageOpen: false,
      miscPageOpen: false,
    })
  }
  */

  searchClickHandler = (query) => {
    this.setState({
      frontPageOpen: false,
      sideDrawerOpen: false,
      search: true,
      queryKey: query,
      productSelected: false,
      cartPageOpen: false,
      heartPageOpen: false,
        /* Side Drawer */
      kitchenPageOpen: false,
      clothesPageOpen: false,
      kidsPageOpen:false,
      officePageOpen: false,
      personalPageOpen: false,
      miscPageOpen: false,
    });
    this.searchResult();
  };

  productSelectHandler = (infoObj) => {
    this.setState({
      frontPageOpen: false,
      sideDrawerOpen: false,
      search: false,
      productSelected: true,
      cartPageOpen: false,
      heartPageOpen: false,
        /* Side Drawer */
      kitchenPageOpen: false,
      clothesPageOpen: false,
      kidsPageOpen:false,
      officePageOpen: false,
      personalPageOpen: false,
      miscPageOpen: false,
      productInfo: infoObj
    })
  }

  kitchenPageOpenHandler = () => {
    this.setState({
      frontPageOpen: false,
      sideDrawerOpen: false,
      search: false,
      productSelected: false,
      cartPageOpen: false,
      heartPageOpen: false,
        /* Side Drawer */
      kitchenPageOpen: true,
      clothesPageOpen: false,
      kidsPageOpen:false,
      officePageOpen: false,
      personalPageOpen: false,
      miscPageOpen: false,
    })
  }

  clothesPageOpenHandler = () => {
    this.setState({
      frontPageOpen: false,
      sideDrawerOpen: false,
      search: false,
      productSelected: false,
      cartPageOpen: false,
      heartPageOpen: false,
        /* Side Drawer */
      kitchenPageOpen: false,
      clothesPageOpen: true,
      kidsPageOpen:false,
      officePageOpen: false,
      personalPageOpen: false,
      miscPageOpen: false,
    })
  }  

  kidsPageOpenHandler = () => {
    this.setState({
      frontPageOpen: false,
      sideDrawerOpen: false,
      search: false,
      productSelected: false,
      cartPageOpen: false,
      heartPageOpen: false,
        /* Side Drawer */
      kitchenPageOpen: false,
      clothesPageOpen: false,
      kidsPageOpen: true,
      officePageOpen: false,
      personalPageOpen: false,
      miscPageOpen: false,
    })
  }

  officePageOpenHandler = () => {
    this.setState({
      frontPageOpen: false,
      sideDrawerOpen: false,
      search: false,
      productSelected: false,
      cartPageOpen: false,
      heartPageOpen: false,
        /* Side Drawer */
      kitchenPageOpen: false,
      clothesPageOpen: false,
      kidsPageOpen:false,
      officePageOpen: true,
      personalPageOpen: false,
      miscPageOpen: false,
    })
  }

  personalPageOpenHandler = () => {
    this.setState({
      frontPageOpen: false,
      sideDrawerOpen: false,
      search: false,
      productSelected: false,
      cartPageOpen: false,
      heartPageOpen: false,
        /* Side Drawer */
      kitchenPageOpen: false,
      clothesPageOpen: false,
      kidsPageOpen:false,
      officePageOpen: false,
      personalPageOpen: true,
      miscPageOpen: false,
    })
  }

  miscPageOpenHandler = () => {
    this.setState({
      frontPageOpen: false,
      sideDrawerOpen: false,
      search: false,
      productSelected: false,
      cartPageOpen: false,
      heartPageOpen: false,
        /* Side Drawer */
      kitchenPageOpen: false,
      clothesPageOpen: false,
      kidsPageOpen:false,
      officePageOpen: false,
      personalPageOpen: false,
      miscPageOpen: true,
    })
  }

  persistDataHandler = () => {
    localStorage.setItem('hearts', JSON.stringify(this.state.heartPageObjects));
    // localStorage.setItem('carts', JSON.stringify(this.state.cartPageObjects));
  }

  addHeartHandler = () => {
    let prevHeart = this.state.heartPageObjects;
    prevHeart.push(this.state.productInfo);
    this.setState({heartPageObjects: prevHeart})
    this.persistDataHandler();
  }

  /*
  addCartHandler = () => {
    let prevCart = [...this.state.cartPageObjects];
    prevCart.push(this.state.productInfo);
    this.setState({cartPageObjects: prevCart});
    this.persistDataHandler();
  }
  */

  searchResult = () => {
    let allResult = [];
    let clothesResult = [];
    clothingCollect.forEach (async (collec, index) => {
      let temp = []
      await (clothingGET.collection(collec).get()).then(item => {
        item.forEach(doc => temp.push(doc.data()));
        temp.forEach((item, index) => {
          try {
            if (item.Keyword.includes(this.state.queryKey)) {
              clothesResult.push(item);
            }
          } catch {
            console.log(Error);
          }
        })
      });

      if (index === clothingCollect.length-1) {
        allResult.push(...clothesResult);
      }
      
    });

    let kitchenResult = [];    
    kitchenCollect.forEach( async(collec, index) => {
      let temp = [];
      await (kitchenGET.collection(collec).get()).then(item => {
        item.forEach(doc => temp.push(doc.data()));
        temp.forEach((item) => {
          try {
            if (item.Keyword.includes(this.state.queryKey)) {
              kitchenResult.push(item);
            }
          } catch {
            console.log(Error);
          }
        })
      });
      if (index === kitchenCollect.length-1) {
        allResult.push(...kitchenResult);
      }
    });

    let kidsResult = [];    
    kidsCollect.forEach( async(collec, index) => {
      let temp = [];
      await (kidsGET.collection(collec).get()).then(item => {
        item.forEach(doc => temp.push(doc.data()));
        temp.forEach((item) => {
          try {
            if (item.Keyword.includes(this.state.queryKey)) {
              kidsResult.push(item);
            }
          } catch {
            console.log(Error);
          }
        })
      });
      if (index === kidsCollect.length-1) {
        allResult.push(...kidsResult);
      }
    });

    let officeResult = [];    
    officeCollect.forEach( async(collec, index) => {
      let temp = [];
      await (officeGET.collection(collec).get()).then(item => {
        item.forEach(doc => temp.push(doc.data()));
        temp.forEach((item) => {
          try {
            if (item.Keyword.includes(this.state.queryKey)) {
              officeResult.push(item);
            }
          } catch {
            console.log(Error);
          }
        })
      });
      if (index === officeCollect.length-1) {
        allResult.push(...officeResult);
      }
    });

    let personalResult = [];    
    personalCollect.forEach( async(collec, index) => {
      let temp = [];
      await (personalGET.collection(collec).get()).then(item => {
        item.forEach(doc => temp.push(doc.data()));
        temp.forEach((item) => {
          try {
            if (item.Keyword.includes(this.state.queryKey)) {
              personalResult.push(item);
            }
          } catch {
            console.log(Error);
          }
        })
      });
      if (index === personalCollect.length-1) {
        allResult.push(...personalResult);
      }
    });

    let miscResult = [];    
    miscCollect.forEach( async(collec, index) => {
      let temp = [];
      await (miscGET.collection(collec).get()).then(item => {
        item.forEach(doc => temp.push(doc.data()));
        temp.forEach((item) => {
          try {
            if (item.Keyword.includes(this.state.queryKey)) {
              miscResult.push(item);
            }
          } catch {
            console.log(Error);
          }
        })
      });
      if (index === miscCollect.length-1) {
        allResult.push(...miscResult);
        this.setState({queryReturned: allResult})
        console.log(allResult);
      }
    });
  }

  

  render() {
    let frontPage;
    let frontPageImages = [
      'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2F%20Household%20%26%20Kitchen%2FFood%20related%2F%20Biodegradable%20Cups%20-%20Disposable%20Cups%2Fcompostable-pla-cold-cup-med-CC3.jpg?alt=media&token=b106b81e-80b5-4acc-99fe-9e6a1b61c126',
      'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2F%20Household%20%26%20Kitchen%2FFood%20related%2F%20Silicon%20Reusable%20Drinking%20Straws%2F49603_1_640px.jpg?alt=media&token=64700c6a-c2de-44c7-bb96-a33535ed02bd',
      'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2F%20Household%20%26%20Kitchen%2FFood%20related%2FStasher%20Stand-Up%20100%25%20Silicone%20Reusable%20Food%20Storage%20Bag%2F812d8QtN2EL._AC_SL1500_.jpg?alt=media&token=add2ddb9-0bc8-4efa-a721-6aad4b73705c',
      'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2F%20Household%20%26%20Kitchen%2FCleaning%2FPaperless%20Towels%2C%20Unpaper%20Towels%2C%20Reusable%20Paper%20Towels%2Fil_794xN.1035810832_ag8t.jpg?alt=media&token=51caa4af-e898-44ab-be24-c62e04e0bb80',
      'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FClothing%2FAlternative%20Apparel%20%2F%20Cotton%20Modal%20Interlock%20Pullover%20Sweatshirt%2F02930MZBK2X0.jpg?alt=media&token=fad361bc-c7c2-4d65-a9fa-55a45d40f048',
      'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FClothing%2FAlternative%20Apparel%20%2FMollusk%20Cotton%20Teddy%20Sweater%2FMS1950NTL0.jpg?alt=media&token=6943d434-ed34-480f-a72f-3fb4c99ce525',
      'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FClothing%2FEcoVibe%2FAlbert%20Vest%20in%20Grey%2Falbert-vest-in-grey-mens-jacket-nifty-genius_720x.jpg?alt=media&token=5b77fe70-9409-4217-a75f-11a2e32b3d78',
      'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FClothing%2FPeople%20Tree%2FKrysta%20Block%20Printed%20Top%2Fkrysta-block-printed-top-1261ede006f2.jpg?alt=media&token=6f74dcc3-13f8-4803-ba2b-7d7509a29fc9'
    ];
    if (this.state.frontPageOpen) {
      frontPage = <FrontPage images={frontPageImages}/>
    }

    /* Sidebar Config */
    let backdrop;
    if (this.state.sideDrawerOpen) {
      backdrop = <BackDrop click={this.backdropClickHandler} />;
    }

    /* In search mode */
    let searchCountBar;
    let searchList;
    if (this.state.search) {
      searchCountBar = <SearchCount count={this.state.queryReturned.length} name={this.state.queryKey} />
      searchList = (
      <Fragment>
        {this.state.queryReturned.map(item => {
          return(
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <SearchList
              select={this.productSelectHandler}
              addHeart={this.addHeartHandler}
              // addCart={this.addCartHandler}
              title={item.id} 
              brand={item.Brand}
              des={item.Description}
              price={item.Price}
              rating={item.Rating}
              url={item.URL}
              image={item.images} />
            </div>
          );
        })}
      </Fragment>
      )
    }

    /* Product Selected */
    let selectProduct;
    if (this.state.productSelected) {
      selectProduct = <SelectProduct info={this.state.productInfo} />
    }

    /* Wish List Page */
    let heartPage;
    if (this.state.heartPageOpen) {
      heartPage = <HeartPage />
    }

    /* Cart Page - for future if have time
    let cartPage;
    if (this.state.cartPageOpen) {
      cartPage = <CartPage />
    }
    */

    /* For Side Drawer */
    let kitchenPage, clothesPage, kidsPage, officePage, personalPage, miscPage;
    let kitchenPageImages = [], clothesPageImages = [], kidsPageImages = [];
    let officePageImages = [], personalPageImages = [], miscPageImages = [];
    if (this.state.kitchenPageOpen) {
      kitchenPageImages = [
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2F%20Household%20%26%20Kitchen%2FBedroom%2FOrganic%20Jersey%20Sheets%2Fpdp_organic_jersey_sheet_stack_multi_f18_1_1024x1024%20(1).webp?alt=media&token=065d5b60-a82a-4c60-b34a-16111538ba79',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2F%20Household%20%26%20Kitchen%2FBedroom%2F%20Soft%20Washed%20Organic%20Sheets%2Fsoftwashed_pewter_stripe.jpg?alt=media&token=4109bef3-a6e5-473d-a5f4-8e83b641dba5',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2F%20Household%20%26%20Kitchen%2FBedroom%2FOrganic%20Prague%20Bath%20Towel%20Set%2FGrund-Prague-Towels-5630_2000x.webp?alt=media&token=79946d88-072d-4aec-8b6e-a55606c7cdc6',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2F%20Household%20%26%20Kitchen%2FBedroom%2F%20Organic%20Turkish%20Cotton%20Robe%2F0007_organic-bath-robe-white_1_3_2000x.jpg?alt=media&token=ce621fa0-07c9-485b-92a1-38a3a593ccde',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2F%20Household%20%26%20Kitchen%2FFood%20related%2F%20Ecofriendly%20Stainless%20Steel%20Smoothie%20Straws%2F41MaJKMfhFL._AC_.jpg?alt=media&token=a0779631-ee08-4180-8905-8bea3bc72222',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2F%20Household%20%26%20Kitchen%2FFood%20related%2F%20Plastic%20Free%20Produce%20Bags%2F50511_1_640px.jpg?alt=media&token=510b9097-e81a-4346-9995-3875c2ea4742',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2F%20Household%20%26%20Kitchen%2FFood%20related%2FDisposable%20Wooden%20Cutlery%20Set%2F81%2Bmwi7IanL._SL1500_.jpg?alt=media&token=b418c1b7-f26b-45f2-8fd8-52d02bbaba07',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2F%20Household%20%26%20Kitchen%2FCleaning%2F%20Detergent%20Spaghetti%20Corn%20Scrubs%2F7110TS8hZfL._AC_SL1500_.jpg?alt=media&token=830d5c8e-b6df-48c3-9bea-ea07b24d1eba'
      ]
      kitchenPage = <KitchenPage images={kitchenPageImages} />
    }

    if (this.state.clothesPageOpen) {
      clothesPageImages = [
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FClothing%2FPact%2FElement%20Pocket%20Tee%2Fmlp-pwt-3-1581457577.jpg?alt=media&token=284be25c-320f-4e53-90d9-5f33d8cff02d',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FClothing%2FPact%2FEssential%20Zip%20Hoodie%2Fwez-cdb-1-1579551442.jpg?alt=media&token=b5487338-3544-4044-988e-6abb8baba2f1',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FClothing%2FPact%2FGo-To%20Legging%2Fwln-blk-2-1579903418.jpg?alt=media&token=a881e6c5-6bfe-4125-9444-b16b2407bee3',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FClothing%2FPact%2FPocket%20Tank%2Fwua-pwt-1-1582053477.jpg?alt=media&token=84f3eb8d-0bd4-427f-b7fc-ff0135922980',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FClothing%2FReformation%2F%20Liza%20High%20Straight%20Jean%2Foriginal0.jpg?alt=media&token=553fa6ee-15a2-431b-93c9-0af134fd7717',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FClothing%2FReformation%2FSerena%20High%20Skinny%20Jean%2Foriginal%20(1).jpg?alt=media&token=adc1bd0f-e972-47bb-8a49-e20fd0038c83',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FClothing%2FWe%20Are%20Thought%2FAmmonite%20Bamboo%20Legging%2Fwsb4619-pewter-grey-ammonite-bamboo-leggings-6.jpg?alt=media&token=d7a2703c-8ffd-45ab-bb1e-8d9c7a19ff02',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FClothing%2FWe%20Are%20Thought%2FFairtrade%20Organic%20Cotton%20Long%20Sleeve%20Top%2Fmst5298-pink--fairtrade-orangic-cotton-long-sleeve-top-1_7.jpg?alt=media&token=4c177439-e88a-4b5c-a3a4-0a33fdb0a8e6'
      ]
      clothesPage = <ClothesPage images={clothesPageImages} />
    }

    if (this.state.kidsPageOpen) {
      kidsPageImages = [
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FKids%2FEntertainment%20%2FEco%20Finger%20Paint%2F40041_1_640px.jpg?alt=media&token=493416be-5598-4b22-ad4a-bcfa97536e1d',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FKids%2FEntertainment%20%2FEco-Dough%2F19466_1_640px.jpg?alt=media&token=d0411607-84c2-426f-8262-c7a2cf24c541',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FKids%2FEntertainment%20%2FRecycled%20Newspaper%20Colored%20Pencils%20%E2%80%93%2024pk%2Fonyx-and-green-recycled-newspaper-colored-pencils.jpg?alt=media&token=1bf56588-90d6-4219-a633-aae580faf87e',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FKids%2FEntertainment%20%2FTide%20Pool%20Bath%20Toys%2Fgreen-toys-tide-pool-bath-set-1.jpg?alt=media&token=c68bf0cf-c06b-4c92-9126-121da77ec3bc',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FKids%2FEntertainment%20%2FAnimal%20Friend%20Organic%20Baby%20Rattle%2Fi-play-baby-animal-friend-organic-baby-rattle-pink.jpg?alt=media&token=1b2b1303-a87f-4e16-b9bd-47145687aeed',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FKids%2FEntertainment%20%2FDump%20Truck%20Toy%2Fgreen-toys-dump-truck-1.jpg?alt=media&token=31b35caf-7c2e-426f-8426-196850a9b3a9',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FKids%2FEntertainment%20%2F%20EverEarth%20Activity%20Walker%2Feverearth-activity-walker-1.jpg?alt=media&token=3aad0757-405d-4b5f-906b-c3ee0fab54bd',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FKids%2FEntertainment%20%2FEco-Crayon%20Beeswax%20Crayon%20Sticks%2Feco-kids-beeswax-crayon-sticks-20pk-1.jpg?alt=media&token=19b3185b-8d5d-4231-b5ee-abc6543d9c6c'
      ]
      kidsPage = <KidsPage images={kidsPageImages} />
    }

    if (this.state.officePageOpen) {
      officePageImages = [
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FOffice%2FNote-taking%2F%20Post-it%20Greener%20Notes%20Original%20Recycled%20Pop-up%20Notes%2F607680.jpg?alt=media&token=1bd5f790-5791-4521-914d-ceca2e936409',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FOffice%2FNote-taking%2F%20Rocketbook%20Fusion%2Fbest-sellers-rocketbook-fusion-13566208802955_2000x.webp?alt=media&token=75f5c508-c4a9-44f1-a10b-d4f217a9d2d0',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FOffice%2FNote-taking%2F%20Rocketbook%20Mini%2Fnotebook-rocketbook-everlast-mini-13566465376395_2000x.webp?alt=media&token=20c76a4d-0cc2-4297-b0aa-6d3c6979706a',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FOffice%2FOther%2F%20Biodegradable%20iPhone%20Case%2011%20PRO%2FPela_Case_iphone_11_Max_case_1_900x.webp?alt=media&token=c54bb7ab-3e96-4acd-bbae-0ed3b6d7fe01',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FOffice%2FOther%2FRechargeable%20Batteries%2FMoixa-Energy---USBCELL-Open.jpg?alt=media&token=88f004df-6f7b-4e8c-a657-ce00bb9ff092',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FOffice%2FWriting%20Utensils%2FPen%20Refill%20Black%2FPen%20Refill%20Black.Media-01.jpg?alt=media&token=cfa17d5e-000a-4f4b-bcfe-1430389b4a09',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FOffice%2FWriting%20Utensils%2F%206%20Assorted%20Refillable%20Whiteboard%20Markers%2F6Packs_480x480.webp?alt=media&token=f47f5d84-0ded-4875-b566-7af4a063cc83',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FOffice%2FWriting%20Utensils%2FAlien%20Pen%2FAlien%20Pen.Media-01.jpg?alt=media&token=76ae2493-ff0d-4683-af45-1a8d527d4fdc'
      ]
      officePage = <OfficePage images={officePageImages} />
    }

    if (this.state.personalPageOpen) {
      personalPageImages = [
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FPersonal%20Care%2FBath%2F%20ECO%20Sachet%20Shampoo%20and%20Conditioner%2F61EtNqTNB4L._SL1300_.jpg?alt=media&token=da705bc9-51f7-4428-a915-fac2f5acf29d',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FPersonal%20Care%2FBath%2F%20Not%20Sleepy%20Shower%20Bomb%2Fweb_not_sleepy_shower_bomb_lush_labs_2018.jpg?alt=media&token=fc406ca9-ce3f-4e26-bcc4-c3b133798f03',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FPersonal%20Care%2FBath%2F%20Magic%20Crystals%20Shower%20Scrub%2Fmagic_crystals_scrub_christmas_2018.jpg?alt=media&token=81c2f4df-1cfd-4ebc-9478-6b3e63b239ce',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FPersonal%20Care%2FBath%2FEthique%20Eco-Friendly%20Solid%20Shampoo%20Bar%20for%20Oily%20Hair%2C%20St%20Clements%2F41u6El5VigL.jpg?alt=media&token=f9bc429a-e6d4-4098-841b-1c89d6f5cea0',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FPersonal%20Care%2FBeauty%2F%207%20To%203%20Cleansing%20Wipe%2F7_to_3_wipe_commerce_2018.jpg?alt=media&token=a0ca78a0-e9b4-4547-a713-1e3772ad9f9e',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FPersonal%20Care%2FBeauty%2FWhipped%20Coconut%20Oil%20Body%20Cream%2FCopy_of_Bottles-67_revised.jpg?alt=media&token=19c22ce1-eda8-4635-a0f5-a5c48e5187a9',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FPersonal%20Care%2FBody%2F%20Baby%20%2B%20Kids%20Paper%20Stick%20SPF%2030%2B%2FRaw_Elements_Kids_Sunscreen_Stick1_900x.jpg?alt=media&token=c0e39a50-b22c-424e-a046-12abbb2e0277',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FPersonal%20Care%2FBody%2FBadger%20-%20SPF%2035%20Zinc%20Oxide%20Sport%20Sunscreen%20Cream%2F714fXyax9bL._SL1300_.jpg?alt=media&token=e21fe9ab-5fc4-4483-982c-0f8e0afbcfaf'
      ]
      personalPage = <PersonalPage images={personalPageImages} />
    }

    if (this.state.miscPageOpen) {
      miscPageImages = [
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FMiscellaneous%2FBags%2F3%20Roll-n-Snap%20Large%20Reusable%20Grocery%20Bags%20Shopping%20Tote%2F91yE2d7hdQL._AC_SL1500_.jpg?alt=media&token=aba0a8f0-f1b7-4a46-aee5-8fd439b6125e',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FMiscellaneous%2FBags%2FBiodegradable%20Trash%20Bags%2F716gEL0XTGL._AC_SL1500_.jpg?alt=media&token=7eaddc57-0b7a-472d-bca2-1abb2258d1ec',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FMiscellaneous%2FBags%2FEarth%20Rated%20Dog%20Poop%20Bags%2F71iL-E8%2BM4L._AC_SL1500_.jpg?alt=media&token=ecd25871-6c17-44f0-96c2-1899767c7d4d',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FMiscellaneous%2FBags%2FEarthwise%20Reusable%20Environmentally%20Friendly%20Grocery%20Shopping%20Tote%2F91dhMbIuHgL._AC_SL1500_.jpg?alt=media&token=66e409d3-b2ae-4fd0-b0ea-e26a794c1dc7',
        'https://firebasestorage.googleapis.com/v0/b/earthxhack-2592f.appspot.com/o/Category%2FMiscellaneous%2FBags%2FReusable%20Heavy%20Duty%20100%25%20Cotton%20Canvas%20Grocery%20Bags%2F81dXrJw62%2BL._AC_SL1500_.jpg?alt=media&token=06379b26-457c-4c3f-9626-725a543a9551'
      ]
      miscPage = <MiscPage images={miscPageImages} />
    }


    return (
      <div className={classes.App}>
        <Toolbar 
        drawerClickHandler={this.drawerToggleClickHandler} 
        isSearch={this.searchClickHandler}
        clickHeart={this.heartPageClickHandler}
        clickCart={this.cartPageClickHandler} />
        {searchCountBar}
        <SideDrawer 
        show={this.state.sideDrawerOpen} 
        clickHide={this.backdropClickHandler}
        clickKitchen={this.kitchenPageOpenHandler}
        clickClothes={this.clothesPageOpenHandler}
        clickKids={this.kidsPageOpenHandler}
        clickOffice={this.officePageOpenHandler}
        clickPersonal={this.personalPageOpenHandler}
        clickMisc={this.miscPageOpenHandler}
        />
        {backdrop}
        <main className={classes.Main}>
          {frontPage}
          {searchList}
          {selectProduct}
          {heartPage}
          {/* {cartPage} */}
          {kitchenPage}
          {clothesPage}
          {kidsPage}
          {officePage}
          {personalPage}
          {miscPage}
        </main>
        
      </div>
    );
  } 
}

export default App;
