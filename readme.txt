To obtain the station list info:
system/stations
example: localhost/system/stations

To retrieve an image from a station:
[dhs_uri]/image
example: localhost/system/station1/dhs1/image
can also use the "overlay" option:
[dhs_uri]/image?overlay
example: localhost/system/station1/dhs1/image?overlay

To get the available parameter list from a station:
[dhs_uri]/parlist
example: localhost/system/station1/dhs1/parlist

To get a specific parameter from a station:
[dhs_uri]/par/[par_id]
example: localhost/system/station1/dhs1/par/fps

To set a specific parameter:
POST [dhs_uri]/par/[par_id]
in the body send a json as follows:
{
"value":[value to change]
}




