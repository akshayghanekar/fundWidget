<?php


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization');
header("Access-Control-Allow-Headers: Content-Type, application/json; charset=UTF-8");

use Slim\Http\Request;
use Slim\Http\Response;

// Routes

$app->get('/[{name}]', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});

// Get fund details
$app->get('/api/getFundDetails', function ($request, $response, $args) {

    date_default_timezone_set("Asia/Calcutta");
    $serverDateTime = date('Y-m-d H:i:s');

    $fund = $this->db->prepare("select * from funinfo");
    $fund->execute();
    $details = $fund->fetchAll();  

    if(count($details) > 0){ 
        
        // Calulating the difference in timestamps 
        $diff = strtotime($details[0]['endDate']) - strtotime($serverDateTime);
        $endDays = abs(round($diff / 86400)); // 1 day = 24 hours so 24 * 60 * 60 = 86400 seconds        
        
        // Create object and return back
        $resp['fundingRequired'] = (int)$details[0]['targetAmount'];
        $resp['fundingObtained'] = (int)$details[0]['amountReceived'];
        $resp['fundingEndTimestamp'] = $endDays;
        $resp['minimumFundingAmount'] = (int)$details[0]['minAmount'];
        $resp['noOfDonors'] = (int)$details[0]['donors'];       
    }    
     
   return $this->response->withJson($resp);
});

// POST request will be made by an application which will be handled here
$app->post('/api/updateFundDetails', function ($request, $response, $args) {

    $input = $request->getParsedBody();
    $inputFundAmount = $input['minimumFundingAmount'];    
    // First get current Donor count and current Amount which is received
    $fund = $this->db->prepare("select * from funinfo");
    $fund->execute();
    $details = $fund->fetchAll();  

    if(count($details) > 0){  
        // Calculate receivedamount and increment donor count
        $received = $details[0]['amountReceived'] + $inputFundAmount;        
        $donors = $details[0]['donors'] + 1;

        $dbUpdate = $this->db->prepare("UPDATE funinfo SET amountreceived=?, donors=?");
        
        if($dbUpdate->execute([$received, $donors])){
            $resp['status'] = true;            
        }
        else
        {
            $resp['status'] = false;            
        }
    }    
     
   return $this->response->withJson($resp);
});

// Reset Funds data to restart
$app->get('/api/resetFundDetails', function ($request, $response, $args) {        
   
    $dbUpdate = $this->db->prepare("UPDATE funinfo SET amountreceived=0, donors=0");
    
    if($dbUpdate->execute()){
        $resp['status'] = true;            
    }
    else
    {
        $resp['status'] = false;            
    }    
     
   return $this->response->withJson($resp);
});

// Catch-all route to serve a 404 Not Found page if none of the routes match
// NOTE: make sure this route is defined last
$app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function($req, $res) {
    $handler = $this->notFoundHandler; // handle using the default Slim page not found handler
    return $handler($req, $res);
});

function getUserDetails($user){
    
    $resp['status'] = 'success';
    $resp['reason'] = 'Login Successfull';
    $resp['userObj']['Id'] = $user[0]['id'];
    $resp['userObj']['Name'] = $user[0]['Name'];
    $resp['userObj']['Gender'] = $user[0]['Gender'];
    $resp['userObj']['Email'] = $user[0]['Email'];
    $resp['userObj']['Mobile'] = $user[0]['Mobile'];
    $resp['userObj']['Address'] = json_decode($user[0]['Address']);
    $resp['userObj']['isVerified'] = $user[0]['isVerified'];
    
    return $resp;
}


