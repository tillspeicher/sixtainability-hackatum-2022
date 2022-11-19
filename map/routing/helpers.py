from shapely.geometry import Point, LineString


def cut_line(line: LineString, distance: float):
    # Cuts a line in two at a given distance from its starting point
    if distance <= 0.0:
        return None, line
    elif distance >= line.length:
        return line, None

    coords = list(line.coords)
    for i, p in enumerate(coords):
        pd = line.project(Point(p))
        if pd == distance:
            return LineString(coords[:i + 1]), LineString(coords[i:])
        if pd > distance:
            cp = line.interpolate(distance)
            return LineString(coords[:i] + [(cp.x, cp.y)]), LineString([(cp.x, cp.y)] + coords[i:])
