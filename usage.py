import tsg_insights_components
import dash
from dash.dependencies import Input, Output
import dash_html_components as html

app = dash.Dash(__name__)
app.scripts.config.serve_locally = True
app.css.config.serve_locally = True

app.layout = html.Div([
    html.H2(html.Pre('tsg_insights_components.InsightChecklist')),
    tsg_insights_components.InsightChecklist(
        id='input-checklist',
        options=[
            {'label': 'New York City', 'value': 'NYC'},
            {'label': 'Montréal', 'value': 'MTL'},
            {'label': 'San Francisco', 'value': 'SF'}
        ],
        value=['MTL', 'SF']
    ),
    html.Div(id='output-checklist'),
    html.Br(),
    html.H2(html.Pre('tsg_insights_components.InsightDropdown')),
    tsg_insights_components.InsightDropdown(
        id='input-dropdown',
        options=[
            {'label': 'New York City', 'value': 'NYC'},
            {'label': 'Montréal', 'value': 'MTL'},
            {'label': 'San Francisco', 'value': 'SF'}
        ],
        multi=False,
        value=['MTL']
    ),
    html.Div(id='output-dropdown'),
    html.Br(),
    html.H2([html.Pre('tsg_insights_components.InsightDropdown (multi=True)')]),
    tsg_insights_components.InsightDropdown(
        id='input-dropdown-multi',
        options=[
            {'label': 'New York City', 'value': 'NYC'},
            {'label': 'Montréal', 'value': 'MTL'},
            {'label': 'San Francisco', 'value': 'SF'}
        ],
        multi=True,
        value=['MTL', 'SF']
    ),
    html.Div(id='output-dropdown-multi'),
    html.Br(),
    html.H2([html.Pre('tsg_insights_components.InsightFoldable')]),
    tsg_insights_components.InsightFoldable(
        id='insights-foldable',
        title={'value': 'Click me to fold'},
        value={'value': 'Shown when hidden'},
        children='Shown when not hidden',
    )
])

@app.callback(Output('output-checklist', 'children'), [Input('input-checklist', 'value')])
def display_output(values):
    return 'You have entered {}'.format(", ".join(values))

@app.callback(Output('output-dropdown-multi', 'children'), [Input('input-dropdown-multi', 'value')])
def display_output(values):
    return 'You have entered {}'.format(", ".join(values))

@app.callback(Output('output-dropdown', 'children'), [Input('input-dropdown', 'value')])
def display_output(values):
    return 'You have entered {}'.format(", ".join(values))


if __name__ == '__main__':
    app.run_server(debug=True, port=8051)
