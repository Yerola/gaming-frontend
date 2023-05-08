import { useState, useEffect } from "react";
import { Image, Icon, Input, Select, Checkbox, Button } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { map } from "lodash";
import classNames from "classnames";
import { Platform } from "@/api";
import styles from "./Menu.module.scss";

const platformCtrl = new Platform();

export function Menu(props) {
  const { isOpenSearch } = props;
  const [platforms, setPlatforms] = useState(null);
  const [showSearch, setShowSearch] = useState(isOpenSearch);
  const [searchText, setSearchText] = useState("");
  const [platf,setPlatf]=useState("");
  const [sort,setSort]=useState("")
  const [discount,setDiscount]=useState(false)
  const [options,setOptions]=useState([{key:"default", value:100,text:"?"}])
  const router = useRouter();
  const [options2,setOptions2] = useState([{key:'precio', value:1,text:"Precio"},{key:'lanzamiento', value:2,text:"Lanzamiento"}])

  const openCloseSearch = () => setShowSearch((prevState) => !prevState);

  useEffect(() => {
    (async () => {
      try {
        const response = await platformCtrl.getAll();
        setPlatforms(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(()=>{
    if(platforms){
      const newOptions = platforms.map(function(platform){
        return {key:platform.attributes.title,
                value:platform.id,
                text:platform.attributes.title
                }
      });
      setOptions(newOptions);
    }
  },[platforms])

  useEffect(() => {
    setSearchText(router.query.s || "");
    setPlatf(parseInt(router.query.p) || "");
    setSort(router.query.o || "");
    setDiscount(router.query.d?true:false);
  }, []);

  const onSearch = (text) => {
    setSearchText(text);
/*     router.replace(`/search?s=${text}`); */
  };

  const onSearchPlatform=(data)=>{
    setPlatf(data);
  }

  const onDiscount = (data)=>{
    setDiscount(data)
  }

  const sortFunction=(data)=>{
    switch(data){
      case 1:
        setSort("price:asc");
        break;
      case "price:asc":
        setSort("price:desc");
        break;
      case "price:desc":
        setSort("price:asc");
        break;
      case 2:
        setSort("releaseDate:desc");
        break;
      case "releaseDate:asc":
        setSort("releaseDate:desc");
        break;
      case "releaseDate:desc":
        setSort("releaseDate:asc");
        break;             
    }
  }

  useEffect(()=>{
    switch(sort){
      case "price:asc":
      setOptions2([{key:'precio', value:sort,text:"Precio ↓"},{key:'lanzamiento', value:2,text:"Lanzamiento"}])
      break;
      case "price:desc":
      setOptions2([{key:'precio', value:sort,text:"Precio ↑"},{key:'lanzamiento', value:2,text:"Lanzamiento"}])
      break;
      case "releaseDate:asc":
        setOptions2([{key:'precio', value:1,text:"Precio"},{key:'lanzamiento', value:sort,text:"Lanzamiento ↓"}])
        break;
      case "releaseDate:desc":
          setOptions2([{key:'precio', value:1,text:"Precio"},{key:'lanzamiento', value:sort,text:"Lanzamiento ↑"}])
      break;
    }
  },[sort])

  const Filter =()=>{
    router.replace(`/search?s=${searchText}${platf!=""?`&p=${platf}`:""}${discount===true?`&d=${discount}`:""}${sort!=""?`&o=${sort}`:""}`);
  }

  const Clean = () => {
    setSearchText("");
    setPlatf("");
    setSort("");
    setDiscount(false);
    router.replace(`/search?s=`);   
  }

  return (
    <div className={styles.platforms}>
      {map(platforms, (platform) => (
        <Link key={`P${platform.id}`} href={`/games/${platform.attributes.slug}`}>
          <Image src={platform.attributes.icon.data.attributes.url} />
          {platform.attributes.title}
        </Link>
      ))}

      <button className={styles.search} onClick={openCloseSearch}>
        <Icon name="search" />
      </button>

      <div
        className={classNames(styles.inputContainer, {
          [styles.active]: showSearch,
        })}
      >
        <div>
          <Input
            id="search-games"
            placeholder="Buscador"
            className={styles.input}
            focus={true}
            value={searchText}
            onChange={(_, data) => onSearch(data.value)}
          />

          <div className={styles.filters}>
            <div className={styles.filters2}>
              <Select placeholder="Plataforma:" options={options} value={platf} onChange={(_,data)=>onSearchPlatform(data.value)}/>

              <Select placeholder="Ordenar por:" options={options2} value={sort} onChange={(_,data)=>sortFunction(data.value)}/>            
            </div>

            <div>
              <Checkbox label='Solo juesgos con descuentos' checked={discount} onChange={(_,data)=>onDiscount(data.checked)}/> 
              <Button onClick={Filter}>Filtrar</Button>
              <Button onClick={Clean}>Limpiar</Button>
            </div>
          </div>
        </div>
          
        <Icon
          name="close"
          className={styles.closeInput}
          onClick={openCloseSearch}
        />
      </div>
    </div>
  );
}
