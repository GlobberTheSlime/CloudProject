from scipy.spatial import Delaunay


class Cluster:
    density = 0
    vertices = None
    months = None
    hull = None

    def __init__(self):
        self.months = {}

    def in_hull(self,p):
        if not isinstance(self.hull,Delaunay):
            self.hull = Delaunay(self.hull)
        return self.hull.find_simplex(p)>=0


class Month:
    cases = 0
    rainfall = 0


