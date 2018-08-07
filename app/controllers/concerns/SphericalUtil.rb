class SphericalUtil

    def interpolate(from, to, fraction) {
        # http://en.wikipedia.org/wiki/Slerp
        fromLat = toRadians(from.latitude)
        fromLng = toRadians(from.longitude)
        toLat = toRadians(to.latitude)
        toLng = toRadians(to.longitude)
        cosFromLat = Math.cos(fromLat)
        cosToLat = Math.cos(toLat)

        # Computes Spherical interpolation coefficients.
        angle = computeAngleBetween(from, to)
        sinAngle = Math.sin(angle)
        
        if (sinAngle < 1E-6) 
           return LatLng.new( from.latitude + fraction * (to.latitude - from.latitude), from.longitude + fraction * (to.longitude - from.longitude))
        end
        
        a = Math.sin((1 - fraction) * angle) / sinAngle
        b = Math.sin(fraction * angle) / sinAngle

        # Converts from polar to vector and interpolate.
        x = a * cosFromLat * Math.cos(fromLng) + b * cosToLat * Math.cos(toLng)
        y = a * cosFromLat * Math.sin(fromLng) + b * cosToLat * Math.sin(toLng)
        z = a * Math.sin(fromLat) + b * Math.sin(toLat)

        # Converts interpolated vector back to polar.
        lat = Math.atan2(z, Math.sqrt(x * x + y * y))
        lng = Math.atan2(y, x)
        LatLng.new(toDegrees(lat), toDegrees(lng));
    end

    def distanceRadians(lat1, lng1, lat2, lng2) 
         arcHav(havDistance(lat1, lat2, lng1 - lng2))
    end

    def computeAngleBetween(from_lat_lng,to_lat_lng) {
         distanceRadians(toRadians(from.latitude), toRadians(from.longitude),toRadians(to.latitude), toRadians(to.longitude))
    end

    def computeDistanceBetween(from_lat_lng, to_lat_lng)
        computeAngleBetween(from, to) * EARTH_RADIUS;
    end

end
