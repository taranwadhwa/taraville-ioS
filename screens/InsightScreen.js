import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Platform, KeyboardAvoidingView, Dimensions,StatusBar } from 'react-native';
import BottomTabNavigationScreen from '../components/BottomTabNavigationScreen'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit'
import { Picker } from '@react-native-picker/picker';
//const width = Dimensions.get('window').width
const width = 360
const height = 200
const chartConfigs = [
  {
    backgroundColor: '#000',
    borderWidth: 2,
    borderColor: '#000',
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    style: {
      borderRadius: 16
    },
   
  },

]
const InsightScreen = (props) => {
  const [data, setData] = React.useState({
    pieChartData:[],
    selectedFilter:'',
    other_info:[]
  })

  const selectedIndex = (index) => {
    setData({...data,selectedFilter:index});
    handleInsights(index);               
  }

  const handleInsights=(filter)=>{
    
    try {
      const syncUserInfo = AsyncStorage.getItem("user_info")
        .then(syncResponse => {
          let parseObject = JSON.parse(syncResponse);
          var uid = parseObject.id;
          var user_token = parseObject.token;
          if (uid != null) {
            try {
              const signInRes = axios.post("https://iosapi.taraville.com/api/v1/insights/listing.php", {
                uid, user_token,filter
              })
                .then(res => {
                  if(res.data.status=="OK"){                    
                    setData({
                      ...data,
                      pieChartData: res.data.crecords, 
                      other_info:res.data.other_records                         
                    });                    
                  }
                  else{
                    alert(res.data.status);                  
                  }                 
                })
            }
            catch (error) {
              console.log("Error while fetching insight list on insight screen=" + error)
            }
          }

        });
    }
    catch (e) {
      console.log("Error while fetching insight list on new status on insight screen=" + e)
    }

  }

  useEffect(() => {
    handleInsights('Today');   
   }, []);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
         <StatusBar backgroundColor="#271933" barStyle="light-content"/> 
      <View style={styles.topHeader}>
        <Text style={styles.header_txt}>Insight</Text>
      </View>
       
      <View style={styles.logo}>
        <Image source={require("../assets/logo.png")} style={{ resizeMode: 'contain', marginTop: 5, width: 170, height: 55 }} />
      </View>
      <ScrollView style={{ marginTop: 2, margin: 3, flex: 1, height: '100%', }}>
        <View style={[styles.messagesCard, styles.elevation]}>
          <View style={{ flexDirection: 'row',justifyContent:'flex-start'}}>                       
            <Picker  mode='dropdown'                                                                        
              style={{width: '100%',height: 50}} itemStyle={{height: 50,}}
              onValueChange={(itemValue, itemIndex) => { selectedIndex(itemValue) }}                                   
              >                
                <Picker.Item label="Today" value="Today" />
                <Picker.Item label="Last 7 days" value="Last 7 days" />
                <Picker.Item label="Last 30 days" value="Last 30 days" />
                <Picker.Item label="Last 3 months" value="Last 3 months" />
            </Picker>                          
          </View>
        </View>
        <View style={[styles.messagesCard, styles.elevation]}>
          {chartConfigs.map(chartConfig => {
            const labelStyle = {
              color: chartConfig.color(),
              marginVertical: 10,
              textAlign: 'center',
              fontSize: 16
            }
            const graphStyle = {
              marginVertical: 2,
              ...chartConfig.style
            }
            return (
              <View
                key={Math.random()}
                style={{
                  width: 190,
                  height:195,
                  borderWidth: 1,
                  borderColor: '#411016',
                  borderStyle: 'dotted',
                  borderRadius: 5
                }}
              >
                <Text style={{ borderStyle: 'dotted' }}>
                  <PieChart
                    data={data.pieChartData}
                    height={height}
                    width={width}
                    chartConfig={chartConfig}
                    accessor="population"
                    style={graphStyle}
                  />
                </Text>
              </View>
            )
          })}
        </View>

        <View style={[styles.messagesCard, styles.elevation]}>
          <View style={{width:'100%'}}>
          <View style={styles.headingView}>
            <Text style={styles.reportHeading}>Total outbound calls placed:</Text>
            <Text style={styles.reportAnswers}>5</Text>
          </View>
          <View style={styles.headingView}>
            <Text style={styles.reportHeading}>Most popular days:</Text>
            <Text style={styles.reportAnswers}>10</Text>
          </View>

          <View style={styles.headingView}>
            <Text style={styles.reportHeading}>Most frequent caller:</Text>
            <Text style={styles.reportAnswers}>Taranjit Singh </Text>
          </View>
          <View style={styles.headingView}>
            <Text style={styles.reportHeading}>Most popular city:</Text>
            <Text style={styles.reportAnswers}>Stamford</Text>
          </View>
          <View style={styles.headingView}>
            <Text style={styles.reportHeading}>Calls by hours:</Text>
            <Text style={styles.reportAnswers}>5</Text>
          </View>
          </View>
        </View>       
      </ScrollView>
      <View style={styles.blank_view}>
             <Text style={styles.input}></Text> 
        </View>


      <BottomTabNavigationScreen navigation={props.navigation} route={props.route} />
    </KeyboardAvoidingView>
  )

}
export default InsightScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#271933',
    flexDirection: 'column',
    borderWidth: 5,
    borderColor: '#000',
  },
  headingView:{    
    flexDirection:'row',    
    borderBottomWidth:1,
    borderBottomColor:'#C1C1C1',
  },
  reportHeading:{
    width:'70%',
    padding:10, 
    fontSize:15,      
    fontWeight:'bold'
  },
  reportAnswers:{
    fontSize:15,
    padding:12,   
  },
  logo: {
    marginTop: 10,
    backgroundColor: '#271933',
    borderRadius: 8,
    height: 65,
    margin: 7,
  },
  messagesCard: {
    backgroundColor: '#FFF',
    borderRadius: 6,
    width: '100%',
    marginVertical: 1,
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0
    },
    padding: 12,
  },
  header_txt: {
    color: '#FFF',
    fontSize: 22,
    marginTop: Platform.OS === 'ios' ? 2 : 10,    
    padding: 10,
    alignContent:'center',
    alignItems:'center',          
  },
  topHeader:{
    flexDirection: 'row', 
    margin:1, 
    borderRadius:1, 
    backgroundColor: '#1BB467',     
    height: Platform.OS === 'ios' ? 50 : 60,
    borderColor:'#1BB467',
    justifyContent:'center'    
  },
  blank_view:{
    marginTop: Platform.OS === 'ios' ? 55 : 30
  },
});