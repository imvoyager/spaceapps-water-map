def get_cloud_locations():
    return [(1, 1), (2, 1), (3, 1), (4, 1)]


def get_ground_wetness(loc):
    return 0.5


def get_forecast(loc):
    return 0.25


def calc_rank(wetness, forecast):
    return wetness * forecast


def main():
    cloud_path = get_cloud_locations()
    output = dict()
    for loc in cloud_path:
        wetness = get_ground_wetness(loc)
        forecast = get_forecast(loc)
        rank = calc_rank(wetness, forecast)
        output[loc] = rank
    
    print(output)

main()
