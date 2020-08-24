import React,{ useState , useEffect } from 'react';
import NewsCards from './Components/NewsCards/NewsCards';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers  from 'words-to-numbers';
import useStyles from './styles';
import './App.css';

const alanKey = 'e56f04daa3dfa120b4d752108582f9842e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {

  const [newsArticles,setNewsArticles] = useState([]);
  const [activeArticle,setActiveArticle] = useState(-1);
  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key:alanKey,
      onCommand: ({ command , articles , number }) =>{
        if(command === 'newHeadlines' ) {
          setNewsArticles(articles);
          setActiveArticle(-1);
        }
        else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle+1 );
        }
        else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy:true}) : number;
          const article = articles[parsedNumber-1];
          if(parsedNumber > 20) {
            alanBtn.playText('Article Number Exceeded');
          }
          else if (article){
            window.open(articles[parsedNumber].url,'_blank');
            alanBtn().playText('Opening Article');
          }
        }
      }
    });
  },[])

  return (
    <div>
      <div className={classes.logoContainer}>
        <img src={require('./NewsHub.png')} className={classes.logo} alt="News Hub Logo"/>

      </div>
      <NewsCards  articles={newsArticles} activeArticle={activeArticle} />

    </div>
  );
}

export default App;
