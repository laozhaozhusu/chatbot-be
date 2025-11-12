import type { NextApiRequest, NextApiResponse } from 'next';
export const BRAND_PRICE_LIST = [
    {
      brand: "周大福",
      goldPriceId: "JO_42660",
      platinumPriceId: "JO_42661",
    },
    {
      brand: "老凤祥",
      goldPriceId: "JO_42657",
      platinumPriceId: "JO_42658",
    },
    {
      brand: "周六福",
      goldPriceId: "JO_42653",
      platinumPriceId: "JO_42654",
    },
    {
      brand: "周生生",
      goldPriceId: "JO_42625",
      platinumPriceId: "JO_42626",
    },
    {
      brand: "六福珠宝",
      goldPriceId: "JO_42646",
      platinumPriceId: "JO_42647",
    },
    {
      brand: "老庙",
      goldPriceId: "JO_42634",
      platinumPriceId: "JO_42635",
    },
    {
      brand: "金至尊",
      goldPriceId: "JO_42632",
      platinumPriceId: "JO_42633",
    },
    {
      brand: "菜百",
      goldPriceId: "JO_42638",
      platinumPriceId: "JO_42639",
    },
    {
      brand: "中国黄金",
      goldPriceId: "JO_52683",
      platinumPriceId: "JO_52684",
    },
    {
      brand: "周大生",
      goldPriceId: "JO_52678",
      platinumPriceId: "JO_52677",
    },
    {
      brand: "潮宏基",
      goldPriceId: "JO_52670",
      platinumPriceId: "JO_61954",
    },
    {
      brand: "宝庆银楼",
      goldPriceId: "JO_52674",
      platinumPriceId: "JO_52673",
    },
    {
      brand: "太阳金店",
      goldPriceId: "JO_52676",
      platinumPriceId: "JO_52675",
    },
    {
      brand: "齐鲁金店",
      goldPriceId: "JO_52680",
      platinumPriceId: "JO_52679",
    },
    {
      brand: "亚一金店",
      goldPriceId: "JO_52672",
      platinumPriceId: "JO_52671",
    },
    {
      brand: "高赛尔",
      goldPriceId: "JO_52681",
      platinumPriceId: "JO_52682",
    },
    {
      brand: "千禧之星",
      goldPriceId: "JO_52686",
      platinumPriceId: "JO_54155",
    },
    {
      brand: "吉盟珠宝",
      goldPriceId: "JO_52689",
      platinumPriceId: "JO_54372",
    },
    {
      brand: "东祥金店",
      goldPriceId: "JO_52692",
      platinumPriceId: "JO_52693",
    },
    {
      brand: "萃华金店",
      goldPriceId: "JO_52694",
      platinumPriceId: "JO_52695",
    },
    {
      brand: "百泰黄金",
      goldPriceId: "JO_52696",
      platinumPriceId: "JO_61908",
    },
    {
      brand: "金象珠宝",
      goldPriceId: "JO_52698",
    },
    {
      brand: "常州金店",
      goldPriceId: "JO_52699",
      platinumPriceId: "JO_52700",
    },
    {
      brand: "扬州金店",
      goldPriceId: "JO_52702",
      platinumPriceId: "JO_52701",
    },
    {
      brand: "嘉华珠宝",
      goldPriceId: "JO_52703",
    },
    {
      brand: "福泰珠宝",
      goldPriceId: "JO_52705",
      platinumPriceId: "JO_52704",
    },
    {
      brand: "城隍珠宝",
      goldPriceId: "JO_52707",
      platinumPriceId: "JO_52706",
    },
    {
      brand: "星光达珠宝",
      goldPriceId: "JO_52709",
      platinumPriceId: "JO_52708",
    },
    {
      brand: "金兰首饰",
      goldPriceId: "JO_52711",
      platinumPriceId: "JO_52712",
    },
    {
      brand: "金银街",
      goldPriceId: "JO_61906",
      platinumPriceId: "JO_61905",
    },
    {
      brand: "多边金都珠宝",
      goldPriceId: "JO_63849",
      platinumPriceId: "JO_63851",
    },
    {
      brand: "富艺珠宝",
      goldPriceId: "JO_92438",
      platinumPriceId: "JO_92441",
    },
    {
      brand: "天乙银饰",
      goldPriceId: "JO_95167",
    },
    {
      brand: "斯尔沃银器",
      goldPriceId: "JO_95168",
    },
    {
      brand: "中钞国鼎",
      goldPriceId: "JO_95169",
    },
    {
      brand: "K金",
      goldPriceId: "JO_339765",
      platinumPriceId: "JO_339767",
    },
    {
      brand: "莱音珠宝",
      goldPriceId: "JO_321446",
      platinumPriceId: "JO_321448",
    },
    {
      brand: "金大福",
      goldPriceId: "JO_52687",
      platinumPriceId: "JO_52688",
    },
    {
      brand: "明牌珠宝",
      goldPriceId: "JO_344211",
    },
    {
      brand: "水贝黄金",
      goldPriceId: "JO_346627",
      platinumPriceId: "JO_346628",
    },
  ];
  
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ status: string; timestamp: string,data: any }>
) {
  if (req.method === 'GET') {

    const quote_json_str = await (
        await fetch(
          "https://api.jijinhao.com/quoteCenter/realTime.htm?codes=JO_42660,JO_42661,JO_56037,JO_42657,JO_42658,JO_42659,JO_42653,JO_42654,JO_42656,JO_42625,JO_42626,JO_56045,JO_42646,JO_42647,JO_56041,JO_42634,JO_42635,JO_42637,JO_42632,JO_42633,JO_42668,JO_42638,JO_42639,JO_95014,JO_52683,JO_52684,JO_52685,JO_52678,JO_52677,JO_52670,JO_61954,JO_52674,JO_52673,JO_52676,JO_52675,JO_52680,JO_52679,JO_52672,JO_52671,JO_52681,JO_52682,JO_52686,JO_54155,JO_52689,JO_54372,JO_52692,JO_52693,JO_52694,JO_52695,JO_52696,JO_61908,JO_52698,JO_52699,JO_52700,JO_52702,JO_52701,JO_52703,JO_52705,JO_52704,JO_52707,JO_52706,JO_52709,JO_52708,JO_52711,JO_52712,JO_61906,JO_61905,JO_61428,JO_63849,JO_63851,JO_63850,JO_92438,JO_92441,JO_92439,JO_95167,JO_95168,JO_95169,JO_339765,JO_339767,JO_339769,JO_321446,JO_321448,JO_321450,JO_52687,JO_52688,JO_344211,JO_346627,JO_346628,JO_346629,&_=1762952067027",
          {
            headers: {
              accept: "*/*",
              "accept-language": "zh-CN,zh;q=0.9",
              "sec-ch-ua":
                '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": '"Windows"',
              "sec-fetch-dest": "script",
              "sec-fetch-mode": "no-cors",
              "sec-fetch-site": "cross-site",
              "sec-fetch-storage-access": "active",
              Referer: "https://m.cngold.org/",
            },
            body: null,
            method: "GET",
          }
        )
      ).text();

      const quote_json = JSON.parse(quote_json_str.replace("var quote_json = ", "").trim());

      const data = BRAND_PRICE_LIST.map(item => {

        return {
          brand: item.brand,
          goldPrice: quote_json?.[item.goldPriceId]?.q63,
          platinumPrice: item?.platinumPriceId?quote_json?.[item?.platinumPriceId ]?.q63:'',
        }
      })
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      data: data,
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ status: 'error', timestamp: new Date().toISOString() } as any);
  }
}
