import pandas as pd
from tests.test_fixtures import example_user_data

pd.set_option('display.width', 300)


def test_flatten_json_to_df():

    df = flatten_json_to_df(example_user_data)
    print(df)
    assert df.shape[0] > 5
    assert df.shape[1] == 4
    df.to_csv('/Users/bobdavis/data/example_user_data_flat.csv')



def flatten_json_to_df(data):
    """
    Transforms json into a pandas dataframe: level, key, value
    :param data:
    :return:
    """
    row_list = flatten_json_to_list(data)
    return pd.DataFrame(row_list, columns=['level', 'parent_key', 'key', 'value'])

def flatten_json_to_list(data, parent_key=None, level=0, index=0):
    row_list = []
    for key, value in data.items():
        if isinstance(data[key], dict):
            row_list.append((level, parent_key, key, None))
            row_list.extend(flatten_json_to_list(data[key], parent_key=key, level=level+1))
        elif isinstance(data[key], list):
            for item in data[key]:
                if isinstance(item, dict):
                    row_list.extend(flatten_json_to_list(item, parent_key=key, level=level+1))
                else:
                    row_list.append((level, parent_key, key, value))
        else:
            row_list.append((level, parent_key, key, value))
    return row_list


test_flatten_json_to_df()