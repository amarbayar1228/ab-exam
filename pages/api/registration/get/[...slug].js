import axios from "axios";

async function SlugPost(slug, data, aa) { 
  return new Promise((resolve, reject) => { 
    axios
      .get(
        `${process.env.URL}/${slug}?orderBy="localId"&equalTo="MEaMhAHfUNcaFau3Qvfzs9u5MJJ2"`
      )
      .then(
        (result) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
  });
}

export default async function handler(req, res) {
  const { slug } = req.query;
  await SlugPost(slug.join("/"), req.body).then(
    function (response) {
      res.status(200).json(response.data);
    },
    function (error) {
      console.log(error);
    }
  );
}