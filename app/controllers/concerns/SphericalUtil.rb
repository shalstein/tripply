class SphericalUtil 

    def computeAngleBetween(from_lat_lng,to_lat_lng) {
         distanceRadians(toRadians(from.latitude), toRadians(from.longitude),
                               toRadians(to.latitude), toRadians(to.longitude))
    end

    def computeDistanceBetween(from_lat_lng, to_lat_lng)
        computeAngleBetween(from, to) * EARTH_RADIUS;
    end
end