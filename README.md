# Tripcast

This app allows a user to get weather reports for the entire route of their trip. With the Tripcast app, no more unexpected weather in the middle of your road trip. Weather conditions are displayed on the map along with the selected route. This grants you the opportunity to decide beforehand if you would like to a trip without having to check the weather of multiple cites.

## Usage

In the first input, enter a starting point address from where you will be starting your trip. in the second input enter a destination address where you would like to arrive. In addition to addresses, you can also use zip codes, city names, and even longitudes and latitudes.

Then click the Get Tripcast button to get your tripcast. The returned results will display a google map with a line to show you your route. Use the color-coded legend for identifying the expected weather condition for each color on the route. You will also find on the left written driving directions with a summary of weather conditions for your route.

When you are done, you can click the search again button on the upper right-hand corner.

## Installation

Before installing you will need to generate a key for using the Google Direction, Google Maps JavaScript, and the OpenWeatherMap API's. Generate a key and set two environmental variables. One should be called `google_directions_key` for the directions key. The second should be called `WEATHER_API_KEY` for the weather key.

Now we run the following commands in the terminal:

```bash
    git clone git@github.com:peacestone/tripply.git`
    cd  tripply
    yarn install
    bundle install
    rails s
```

in a separate terminal window start the webpack compiler:

```bash
 ./bin/webpack-dev-server
```

Log on to localhost:3000 and it should be working.

## Contribute

Pull requests are always welcome at it's [Github repository](https://github.com/peacestone/tripply) . If you find an issue or have a feature request please raise an issue in the issues section of the Github repository.

## License

This project is available as open source through the MIT License.
