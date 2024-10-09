in Home page
// 	The GET /movies/allmovies endpoint returns a JSON response with a status code of 200. The response body has a data object containing two arrays: whatIsOn and upcomingMovies. Each array contains objects representing movies with properties such as movie_id, title, trailer, running_time, story, language, poster, release_date, now_showing, starring, and director. The running_time property may have a null value for upcoming movies.
	// Here is a JSON schema representing the structure of the response:
	// {
	//   "type": "object",
	//   "properties": {
	//     "status": { "type": "string" },
	//     "data": {
	//       "type": "object",
	//       "properties": {
	//         "whatIsOn": {
	//           "type": "array",
	//           "items": {
	//             "type": "object",
	//             "properties": {
	//               "movie_id": { "type": "string" },
	//               "title": { "type": "string" },
	//               "trailer": { "type": "string" },
	//               "running_time": { "type": ["number", "null"] },
	//               "story": { "type": "string" },
	//               "language": { "type": "string" },
	//               "poster": { "type": "string" },
	//               "release_date": { "type": "string" },
	//               "now_showing": { "type": "boolean" },
	//               "starring": { "type": "string" },
	//               "director": { "type": "string" }
	//             }
	//           }
	//         },
	//         "upcomingMovies" => limit = 5 only : {
	//           "type": "array",
	//           "items": {
	//             "type": "object",
	//             "properties": {
	//               "movie_id": { "type": "string" },
	//               "title": { "type": "string" },
	//               "trailer": { "type": "string" },
	//               "running_time": { "type": ["number", "null"] },
	//               "story": { "type": "string" },
	//               "language": { "type": "string" },
	//               "poster": { "type": "string" },
	//               "release_date": { "type": "string" },
	//               "now_showing": { "type": "boolean" },
	//               "starring": { "type": "string" },
	//               "director": { "type": "string" }
	//             }
	//           }
	//         }
	//       }
	//     }
	//   }
	 }
  in movie page
  gets all movies depending on the params passed wether to get the shown movies or the upcoming movies

  in food page
  get all the rows from the database from (food_drinks) table with joining (food_drinks and food_categories) tables to get category name for the food

  in reservation page
  gets all seats from seats table
