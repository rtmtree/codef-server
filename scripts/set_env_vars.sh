# export environment variables in env file
echo "export from env file: $1"
while IFS== read -r key value; 
do
    echo $key="$value"
    export $key="$value"
done < $1