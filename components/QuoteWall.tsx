import React, { useMemo } from 'react';
import { Language, QuoteOrWallpaper } from '../types';
import { translations } from '../translations';

interface QuoteWallProps {
  lang: Language;
}

export const QuoteWall: React.FC<QuoteWallProps> = ({ lang }) => {
  const t = translations[lang];

  const items: QuoteOrWallpaper[] = useMemo(() => {
      // Base items that might be language specific
      if (lang === 'zh-CN' || lang === 'zh-TW') {
          return [
            {
              id: 'm1',
              type: 'wallpaper',
              text: "如果记忆也是一个罐头的话，我希望这罐罐头不会过期。",
              author: "《重庆森林》",
              imageUrl: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=800&auto=format&fit=crop"
            },
            {
              id: 'm2',
              type: 'quote',
              text: "如果多一张船票，你愿不愿意跟我一起走？",
              author: "《花样年华》"
            },
             {
              id: 'm3',
              type: 'wallpaper',
              text: "说的是一辈子！差一年，一个月，一天，一个时辰，都不算一辈子！",
              author: "《霸王别姬》",
              imageUrl: "https://images.unsplash.com/photo-1536746803623-cef87080bfc8?q=80&w=800&auto=format&fit=crop"
            },
            {
              id: 'm4',
              type: 'quote',
              text: "I missed you. (我错过你了 / 我想你了)",
              author: "《后来的我们》"
            },
             {
              id: 'm5',
              type: 'wallpaper',
              text: "后来我们什么都有了，却没有了我们。",
              author: "《后来的我们》",
              imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop"
            },
            {
              id: 'm6',
              type: 'quote',
              text: "在这个流行离开的世界，但是我们都不擅长告别。",
              author: "Echoes"
            },
            {
              id: 'm7',
              type: 'wallpaper',
              text: "我的意中人是个盖世英雄，有一天他会踩着七色云彩来娶我，我猜中了前头，可是我猜不着这结局。",
              author: "《大话西游》",
              imageUrl: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?q=80&w=800&auto=format&fit=crop"
            },
            {
              id: 'm8',
              type: 'quote',
              text: "生活总是这么难吗？还是只有童年如此？\n总是如此。",
              author: "《这个杀手不太冷》"
            },
            {
              id: 'm9',
              type: 'quote',
              text: "不如我们从头来过。",
              author: "《春光乍泄》"
            },
            {
              id: 'm10',
              type: 'quote',
              text: "有些事情你越想忘记，就会记得越牢。当你不可以再拥有的时候，你唯一可以做的，就是让自己不要忘记。",
              author: "《东邪西毒》"
            },
            {
              id: 'm11',
              type: 'quote',
              text: "只要记住你的名字，不管你在世界的哪个地方，我一定会去见你。",
              author: "《你的名字》"
            },
            {
              id: 'm12',
              type: 'quote',
              text: "我们最接近的时候，我跟她之间的距离只有0.01公分，57个小时之后，我爱上了这个女人。",
              author: "《重庆森林》"
            },
            {
              id: 'm13',
              type: 'quote',
              text: "曾经有一份真诚的爱情放在我面前，我没有珍惜，等我失去的时候我才后悔莫及。",
              author: "《大话西游》"
            },
            {
              id: 'm14',
              type: 'quote',
              text: "你好吗？我很好。",
              author: "《情书》"
            },
            {
              id: 'm15',
              type: 'quote',
              text: "人生不能像做菜，把所有的料都备好了才下锅。",
              author: "《饮食男女》"
            },
            {
              id: 'm16',
              type: 'quote',
              text: "有些人浅薄，有些人金玉其外败絮其中，但有一天，你会遇到一个彩虹般绚丽的人，从此以后，其他人就不过是匆匆浮云。",
              author: "《怦然心动》"
            },
            {
              id: 'm17',
              type: 'quote',
              text: "世间所有的相遇，都是久别重逢。",
              author: "《一代宗师》"
            }
          ];
      } else if (lang === 'ja') {
          return [
             {
              id: 'j1',
              type: 'wallpaper',
              text: "お元気ですか？私は元気です。",
              author: "『Love Letter』",
              imageUrl: "https://images.unsplash.com/photo-1520962922320-2038eebab146?q=80&w=800&auto=format&fit=crop"
            },
             {
              id: 'j2',
              type: 'quote',
              text: "ねえ、秒速5センチなんだって。桜の花の落ちるスピード。",
              author: "『秒速5センチメートル』"
            },
            {
              id: 'j3',
              type: 'wallpaper',
              text: "一度あったことは忘れないものさ。思い出せないだけで。",
              author: "『千と千尋の神隠し』",
              imageUrl: "https://images.unsplash.com/photo-1490750967868-58cb75062ed0?q=80&w=800&auto=format&fit=crop"
            },
             {
              id: 'j4',
              type: 'quote',
              text: "誰かを愛することは、その人の幸せを願うことだ。",
              author: "『東京ラブストーリー』"
            },
             {
              id: 'j5',
              type: 'wallpaper',
              text: "私たちが宇宙に放った孤独な信号が、いつか誰かに届くことを祈って。",
              author: "Echoes",
              imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
            },
            {
              id: 'j6',
              type: 'quote',
              text: "生きろ。そなたは美しい。",
              author: "『もののけ姫』"
            },
            {
              id: 'j7',
              type: 'quote',
              text: "忘れたくないこと。忘れたくない人。忘れちゃダメな人。君の名前は？",
              author: "『君の名は。』"
            },
            {
              id: 'j8',
              type: 'quote',
              text: "君の膵臓をたべたい。",
              author: "『君の膵臓をたべたい』"
            },
            {
              id: 'j9',
              type: 'quote',
              text: "愛してる… その言葉が言えなくて、風に乗せて飛ばした。",
              author: "Echoes"
            },
            {
              id: 'j10',
              type: 'quote',
              text: "言の葉は、時として呪いになる。",
              author: "『言の葉の庭』"
            },
            {
              id: 'j11',
              type: 'quote',
              text: "夢を見る。一人ぼっちの夢を。",
              author: "『新世紀エヴァンゲリオン』"
            },
            {
              id: 'j12',
              type: 'quote',
              text: "さよならは、また会うための約束だ。",
              author: "匿名"
            },
            {
              id: 'j13',
              type: 'quote',
              text: "なんでもないや。",
              author: "『君の名は。』"
            },
            {
              id: 'j14',
              type: 'quote',
              text: "泣いていいんだよ。泣きたい時は泣けばいい。",
              author: "『となりのトトロ』"
            },
            {
              id: 'j15',
              type: 'quote',
              text: "思い出は、いつも綺麗だけど、それだけじゃお腹が空くわ。",
              author: "『新世紀エヴァンゲリオン』"
            },
            {
              id: 'j16',
              type: 'quote',
              text: "世界が終るまでは…",
              author: "『SLAM DUNK』"
            }
          ]
      } else {
          // English
          return [
             {
              id: 'e1',
              type: 'wallpaper',
              text: "Please let me keep this memory, just this one.",
              author: "Eternal Sunshine of the Spotless Mind",
              imageUrl: "https://images.unsplash.com/photo-1604882355165-4450cb6155b2?q=80&w=800&auto=format&fit=crop"
            },
            {
              id: 'e2',
              type: 'quote',
              text: "The more you know who you are and what you want, the less you let things upset you.",
              author: "Lost in Translation"
            },
             {
              id: 'e3',
              type: 'wallpaper',
              text: "I'm always gonna love you.",
              author: "La La Land",
              imageUrl: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=800&auto=format&fit=crop"
            },
             {
              id: 'e4',
              type: 'quote',
              text: "We accept the love we think we deserve.",
              author: "The Perks of Being a Wallflower"
            },
            {
              id: 'e5',
              type: 'wallpaper',
              text: "Frankly, my dear, I don't give a damn.",
              author: "Gone with the Wind",
              imageUrl: "https://images.unsplash.com/photo-1507842217121-e9f50eee4dd9?q=80&w=800&auto=format&fit=crop"
            },
             {
              id: 'e6',
              type: 'quote',
              text: "Time heals everything, but it does not take away the scars.",
              author: "Echoes"
            },
             {
               id: 'e7',
               type: 'wallpaper',
               text: "I love you. I’ve loved you since the first moment I saw you. I guess maybe I’ve even loved you before I saw you.",
               author: "A Place in the Sun",
               imageUrl: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=800&auto=format&fit=crop"
             },
            {
              id: 'e8',
              type: 'quote',
              text: "We'll always have Paris.",
              author: "Casablanca"
            },
            {
              id: 'e9',
              type: 'quote',
              text: "I wish I knew how to quit you.",
              author: "Brokeback Mountain"
            },
            {
              id: 'e10',
              type: 'quote',
              text: "Sometimes, I think I have felt everything I'm ever gonna feel.",
              author: "Her"
            },
            {
              id: 'e11',
              type: 'quote',
              text: "You make me want to be a better man.",
              author: "As Good as It Gets"
            },
            {
              id: 'e12',
              type: 'quote',
              text: "It's not your fault.",
              author: "Good Will Hunting"
            },
            {
              id: 'e13',
              type: 'quote',
              text: "I'm also just a girl, standing in front of a boy, asking him to love her.",
              author: "Notting Hill"
            },
            {
              id: 'e14',
              type: 'quote',
              text: "Hearts are wild creatures, that's why our ribs are cages.",
              author: "Unknown"
            },
            {
              id: 'e15',
              type: 'quote',
              text: "Some people can’t believe in themselves until someone else believes in them first.",
              author: "Good Will Hunting"
            },
            {
              id: 'e16',
              type: 'quote',
              text: "I miss you more than I can bear.",
              author: "Tenet"
            },
            {
              id: 'e17',
              type: 'quote',
              text: "To me, you are perfect.",
              author: "Love Actually"
            }
          ]
      }
  }, [lang]);

  return (
    <div className="max-w-6xl mx-auto mt-10 animate-in fade-in duration-700 pb-20">
      <div className="text-center mb-12">
        <h2 className="serif text-4xl mb-4">{t.quotes_title}</h2>
        <p className="text-gray-500 font-light">{t.quotes_desc}</p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {items.map((item) => (
          <div key={item.id} className="break-inside-avoid">
            {item.type === 'wallpaper' ? (
              <div className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-gray-100">
                <img 
                  src={item.imageUrl} 
                  alt="Mood" 
                  className="w-full h-auto object-cover brightness-[0.7] group-hover:brightness-[0.5] transition-all duration-500" 
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center">
                  <p className="text-white font-serif text-xl md:text-2xl leading-relaxed drop-shadow-md opacity-90 group-hover:opacity-100 transition-opacity">
                    {item.text}
                  </p>
                   {item.author && (
                     <p className="text-white/80 text-sm mt-2 font-light italic">— {item.author}</p>
                   )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
                  <a 
                    href={item.imageUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white text-xs uppercase tracking-widest border border-white/50 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors"
                  >
                    {t.download}
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center flex flex-col justify-center min-h-[180px]">
                <p className="font-serif text-xl text-gray-800 leading-relaxed mb-4">
                  "{item.text}"
                </p>
                {item.author && (
                  <span className="text-xs text-gray-400 uppercase tracking-widest">— {item.author}</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};