class Extractor:
    kmeans = None
    density_coords = None
    density = None
    predictive_data = None
    clusters = []
    highest_density = 0
    highest_cases = 0

    def get_clusters(self, latitude, longitude):
        clusters = []
        for cluster in self.clusters:
            if cluster.in_hull((latitude, longitude)):
                clusters.append(cluster)
                break
        return clusters



