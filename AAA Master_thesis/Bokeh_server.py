import numpy as np
from sklearn.decomposition import PCA
import pandas as pd
import yaml
import math
import base64
import io

from bokeh.plotting import figure, show, output_file
from bokeh.palettes import Viridis256,magma,viridis
from bokeh.models import ColumnDataSource,Label,Line,LabelSet,Text,MultiLine,FileInput,GroupFilter
from bokeh.models import LinearColorMapper,Circle,HoverTool,Dropdown,DataTable,TableColumn,CDSView, IndexFilter,ColorBar
from bokeh.themes import Theme
from bokeh.io import show, output_notebook, curdoc
from bokeh.layouts import column,gridplot
from bokeh.models.widgets import Select
from bokeh.transform import linear_cmap

from bokeh.layouts import column,row
from bokeh.models import ColumnDataSource, CustomJS, Slider
from bokeh.models.widgets import Select
from bokeh.plotting import Figure

class Python_visualizer:
    def __init__(self,layout=None):
        self.layout = layout
        self.text = """
            attrs:
                Figure:
                    background_fill_color: "#DDDDDD"
                    outline_line_color: white
                    toolbar_location: above
                    height: 500
                    width: 500
                Grid:
                    grid_line_dash: [6, 4]
                    grid_line_color: white
        """
    def set_theme(self,text):
        self.text = text
        
    def set_layout(self,layout):
        self.layout = layout
        
    def display(self):
        output_notebook()
        show(self.bkapp)

    def display_web(self):
        curdoc().clear()
        curdoc().theme = Theme(json=yaml.load(self.text, Loader=yaml.FullLoader))
        curdoc().add_root(self.layout)
    
    def bkapp(self,doc):
        doc.add_root(self.layout)
        doc.theme = Theme(json=yaml.load(self.text, Loader=yaml.FullLoader))
    
vis = Python_visualizer()

#Scatterplot stuff
x = [x*0.005 for x in range(0, 200)]
y = x

source = ColumnDataSource(data=dict(x=x, y=y))
TOOLS = "box_select,lasso_select,help"
plot = Figure(plot_width=400, plot_height=400)
plot.line('x', 'y', source=source, line_width=3, line_alpha=0.6)
plot2 = Figure(tools = TOOLS)
plot2.scatter('x', 'y', source=source)
def update_plot(attrname, old, new):
    print('Hello')
source.selected.on_change('indices',update_plot)
layout = row(plot,plot2)

#Lime stuff


vis.set_layout(layout)
vis.display_web()