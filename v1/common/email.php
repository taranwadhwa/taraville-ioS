<?php
function signUpTemplate($email_array)
{
	$template='';
	$template.='<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"
 xmlns:v="urn:schemas-microsoft-com:vml"
 xmlns:o="urn:schemas-microsoft-com:office:office">
 <head>';

$template.='<style>';
	$css = file_get_contents('assets/css/email-style.css');
	$template.=$css;
$template.='</style>';

$template.='</head>';
	
	$template.='
<body marginwidth="0" marginheight="0" style="margin-top: 0; margin-bottom: 0; padding-top: 0; padding-bottom: 0; width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" offset="0" topmargin="0" leftmargin="0" data-new-gr-c-s-check-loaded="14.984.0" data-gr-ext-installed="">

		<table align="center" bgcolor="#f7f9fb" border="0" cellpadding="0" cellspacing="0" width="100%">
			<tbody>
				<tr>
					<td height="35" class="height20" style="mso-line-height-rule:exactly; line-height:35px;">
						<!--[if gte mso 15]>&nbsp;<![endif]-->
					</td>
				</tr>
				<tr>
					<td align="center">
						<!--[if mso]>
								<table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="600" style="width: 600px;">
									<tr>
										<td align="center" valign="top" width="100%" style="max-width:600px;">
											<![endif]-->
						<div style="display:inline-block; width:100%; max-width:600px; vertical-align:top;" class="width600">
							<!-- ID:BG MENU -->
							<table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" class="display-width" width="100%" style="max-width:600px;">
								<tbody>
									<tr>
										<td align="center">
											<!--[if mso]>
										<table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="600" style="width:600px;">
											<tr>
												<td align="center" valign="top" width="600">
													<![endif]-->
											<div style="display:inline-block; width:100%; max-width:600px; vertical-align:top;" class="width600">
												<table align="center" border="0" class="display-width-inner" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
													<tbody>
													<tr>
														<td align="center" style="border-collapse:collapse; width:100%; max-width:100%;">
															<!--[if mso]>
														<table  aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="100%" style="width:100%;">
															<tr>
																<td align="center" valign="top" width="600">
																	<![endif]-->
															<div style="display:inline-block; max-width:600px; width:100%; vertical-align:top;" class="full-block-div">
																<!--TABLE LEFT-->
																<table align="center" border="0" cellpadding="0" cellspacing="0" class="display-width-child" width="100%" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; width:100%; max-width:100%;">
																	<tbody>

																	 <tr pardot-repeatable="">
																		<td align="center" style="" valign="middle">
																			<table align="left" border="0" cellpadding="0" cellspacing="0" class="display-width-child" width="100%" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; max-width:100%; width:100%;">
																				<tbody><tr>
																					<td align="center" style="padding:40px 50px 40px 50px;"  class="res-padding">
																						<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;">
																							<tbody><tr>
																								<td align="left">
																									<table align="left" width="100%" border="0" cellpadding="0" cellspacing="0">
																										<tbody><tr>
																											<td align="left" style="color:#54595F;" width="160">
																													<a href="https://tarasoffice.com/" style="color:#000000; text-decoration:none;"><img pardot-region="REGIONIMG8308425114" pardot-region-type="image" src="'.HOST_URL.'images/email-template/logo.png" alt="logo" width="150" height="auto" style="margin:0; border:0; padding:0; display:block;"></a>
																											</td>
																										</tr>
																									</tbody></table>
																								</td>
																							</tr>
																						</tbody></table>
																					</td>
																				</tr>
																			</tbody></table>
																		</td>
																	</tr>
																</tbody></table>
															</div>
															<!--[if mso]>
															</td>

															</tr>
														</table>
														<![endif]-->
														</td>
													</tr>
												</tbody></table>
											</div>
											<!--[if mso]>
													</td>
												</tr>
											</table>
											<![endif]-->
										</td>
									</tr>

							</tbody></table>
						</div>
						<!--[if mso]>
										</td>
									</tr>
								</table>
							<![endif]-->
					</td>
				</tr>
			</tbody>
		</table>


    <table align="center" bgcolor="#f7f9fb" border="0" cellpadding="0" cellspacing="0" width="100%">
			<tbody>
				<tr>
					<td align="center">
						<!--[if mso]>
								<table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="600" style="width: 600px;">
									<tr>
										<td align="center" valign="top" width="100%" style="max-width:600px;">
											<![endif]-->
											<div style="display:inline-block; width:100%; max-width:600px; vertical-align:top;" class="width600">
												<!-- ID:BG SECTION-1 -->
												<table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" class="display-width" width="100%" style="max-width:600px;">

														<tbody><tr>
															<td align="center" bgcolor="#71026b" style="padding:0px 0px 0px 50px;" class="res-padding">
																<!--[if mso]>
																	<table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="550" style="width:550px;">
																		<tr>
																			<td align="center">
																					<![endif]-->
																			<div style="display:inline-block; width:100%; max-width:550px; vertical-align:top;" class="width550">
																				<table align="left" border="0" class="display-width-inner" cellpadding="0" cellspacing="0" width="100%" style="max-width:550px;">
																					<tbody>

																					<tr pardot-repeatable="">
																						<td align="center" bgcolor="#71026b" style="font-size:0px;" valign="middle">
																							<!--[if mso]>
																							<table  aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="100%" style="width:100%;">
																								<tr>
																									<td align="center" valign="middle" width="292">
																										<![endif]-->
																										<div style="display:inline-block; max-width:292px; vertical-align:middle; width:100%;" class="full-block-div">
																											<!-- TABLE LEFT -->
																											<table align="left" border="0" cellpadding="0" cellspacing="0" class="display-width-child" width="100%" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; max-width:100%; width:100%;">
																												<tbody><tr>
																													<td align="center" style="padding:30px 0px 30px 10px;" class="sm-prl-0">
																														<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;">
																															<tbody>

                                                                <tr>
  																																<td align="left" class="MsoNormal" style="color:#ffffff; font-family:\'Roboto\', Arial, Helvetica Neue, Helvetica, sans-serif; font-weight:700; font-size:45px; line-height:55px; letter-spacing:0.2px; mso-line-height-rule: exactly;" pardot-region="">
  																																	 Welcome to taraville!
  																																</td>
  																															</tr>
																														</tbody></table>
																													</td>
																												</tr>
																											</tbody></table>
																										</div>
																										<!--[if mso]>
																										</td>
																										<td align="center" valign="middle" width="257">
																											<![endif]-->
																										<div style="display:inline-block; max-width:257px; vertical-align:middle; width:100%;" class="full-block-div">
																											<!-- TABLE RIGHT -->
																											<table align="right" border="0" cellpadding="0" cellspacing="0" class="display-width-child" width="100%" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; max-width:100%; width:100%;">
																												<tbody><tr>
																													<td align="left" style="padding:0px;">
																														<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;">
																															<tbody>
                                                                <tr>
                                                                <td align="left" style="color:#54595F;" width="242">
                                                                   <img pardot-region="REGIONIMG830842517" pardot-region-type="image" class="fullwidth" src="'.HOST_URL.'images/email-template/topab.png" alt="Call Now" width="242" height="auto" style="margin:0; border:0; padding:0; width:100%; max-width:100%; display:block; height:auto;">
                                                                </td>
                                                                </tr>

																														</tbody></table>
																													</td>
																												</tr>
																											</tbody></table>
																										</div>
																										<!--[if mso]>
																									</td>
																								</tr>
																							</table>
																							<![endif]-->
																						</td>
																					</tr>

																				</tbody></table>
																			</div>
																			<!--[if mso]>
																			</td>
																		</tr>
																	</table>
																<![endif]-->
															</td>
														</tr>

												</tbody></table>
											</div>
											<!--[if mso]>
										</td>
									</tr>
								</table>
							<![endif]-->
					</td>
				</tr>
			</tbody>
		</table>


    <table align="center" bgcolor="#f7f9fb" border="0" cellpadding="0" cellspacing="0" width="100%">
			<tbody>
				<tr>
					<td align="center">
						<!--[if mso]>
								<table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="600" style="width: 600px;">
									<tr>
										<td align="center" valign="top" width="100%" style="max-width:600px;">
											<![endif]-->
											<div style="display:inline-block; width:100%; max-width:600px; vertical-align:top;" class="width600">
												<!-- ID:BG SECTION-1 -->
												<table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" class="display-width" width="100%" style="max-width:600px;">

														<tbody><tr>
															<td align="center" style="padding:40px 50px 40px 50px;" class="res-padding">
																<!--[if mso]>
																	<table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="500" style="width:500px;">
																		<tr>
																			<td align="center">
																					<![endif]-->
																			<div style="display:inline-block; width:100%; max-width:500px; vertical-align:top;" class="width500">
																				<table align="center" border="0" class="display-width-inner" cellpadding="0" cellspacing="0" width="100%" style="max-width:500px;">
																					<tbody>

																					<tr pardot-repeatable="">
                                            <td align="left" valign="middle" class="MsoNormal" style="color:#29333D; font-family:\'Roboto\', Arial, Helvetica Neue, Helvetica, sans-serif; font-weight:400; font-size:16px; line-height:26px; letter-spacing:0px; mso-line-height-rule: exactly;padding:0px 0px 10px 0px;" pardot-region=""> <span style="font-weight:bold; color:#71026b">Thanks</span>  for signing-up, Tara\'s here to answer your calls and connect with your callers so you can focus on your business. We never call in sick. We never go on vacation. We are always on so you can stop spreading yourself thin.
																						</td>
																					</tr>

																				</tbody></table>
																			</div>
																			<!--[if mso]>
																			</td>
																		</tr>
																	</table>
																<![endif]-->
															</td>
														</tr>

												</tbody></table>
											</div>
											<!--[if mso]>
										</td>
									</tr>
								</table>
							<![endif]-->
					</td>
				</tr>
			</tbody>
		</table>



		<table align="center" bgcolor="#f7f9fb" border="0" cellpadding="0" cellspacing="0" width="100%">
			<tbody>
				<tr>
					<td align="center">
						<!--[if mso]>
								<table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="600" style="width: 600px;">
									<tr>
										<td align="center" valign="top" width="100%" style="max-width:600px;">
											<![endif]-->
											<div style="display:inline-block; width:100%; max-width:600px; vertical-align:top;" class="width600">
												<!-- ID:BG SECTION-1 -->
												<table align="center" bgcolor="#f1f0f0" border="0" cellpadding="0" cellspacing="0" class="display-width" width="100%" style="max-width:600px;">

														<tbody><tr>
															<td align="center" style="padding:30px 50px 30px 50px; border-top: 8px solid #f7f9fb" class="res-padding">
																<!--[if mso]>
																	<table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="500" style="width:500px;">
																		<tr>
																			<td align="center">
																					<![endif]-->
																			<div style="display:inline-block; width:100%; max-width:500px; vertical-align:top;" class="width500">
																				<table align="left" border="0" class="display-width-inner" cellpadding="0" cellspacing="0" width="100%" style="max-width:500px;">
																					<tbody><tr>
																						<td height="20" style="mso-line-height-rule:exactly; line-height:20px;">&nbsp;
																							
																						</td>
																					</tr>
																					<tr>
																						<td align="left" style="color:#71026b; font-family:\'Roboto\', Arial, Helvetica Neue, Helvetica, sans-serif !important; font-weight:700; font-size:50px; line-height:60px; text-align:left; letter-spacing:0.2px; padding-bottom: 15px" class="" pardot-region="">
																							What is taraville?
																						</td>
																					</tr>

                                          <tr>
																						<td align="left" style="color:#29333D; font-family:\'Roboto\', Arial, Helvetica Neue, Helvetica, sans-serif !important; font-weight:400; font-size:16px; line-height:26px; text-align:left; letter-spacing:0.2px; padding-bottom: 15px" class="" pardot-region="">
																							Taraville is our mobile friendly, online dashboard. All you need is Taraville and a smart phone to manage your business from anywhere. In Taraville you can update your status, get real-time updates and check messages while on the go.
																						</td>
																					</tr>
																					<tr>
																						<td height="5" style="mso-line-height-rule:exactly; line-height:5px;">&nbsp;
																							
																						</td>
																					</tr>
																					<tr>
																						<td align="left">
																							<table align="left" border="0" width="100%" cellpadding="0" cellspacing="0">
																								<tbody><tr>
																									<td height="5" style="mso-line-height-rule:exactly; line-height:5px;">
																									</td>
																								</tr>
																								<tr>
                                                  <td align="left" valign="top" rowspan="2" width="60" style="padding-top: 10px">
																										 <img src="'.HOST_URL.'images/email-template/1.png" alt="One" width="60" style="margin:0; border:0; padding:0; display:block;">
																									</td>
																									<td align="left" valign="top" class="MsoNormal" style="color:#71026b; font-family:\'Roboto\', Arial, Helvetica Neue, Helvetica, sans-serif;font-size:20px; font-weight:700; letter-spacing:0.2px; line-height: 30px; padding-left: 15px" pardot-region="">
																										One-tap call handling
																									</td>
																								</tr>
                                                <tr>
                                                  <td align="left" valign="top" class="MsoNormal" style="color:#29333D; font-family:\'Roboto\', Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px; font-weight:400; letter-spacing:0.2px; line-height: 28px; padding-top: 10px; padding-left: 15px" pardot-region="">
																										Simply tap "hold my calls" & we\'ll take messages until you return or say otherwise.
																									</td>
																								</tr>
																								<tr>
																									<td height="5" style="mso-line-height-rule:exactly; line-height:5px;">
																									</td>
																								</tr>
																							</tbody></table>
																						</td>
																					</tr>

																					<tr>
																						<td align="left">
																							<table align="left" border="0" width="100%" cellpadding="0" cellspacing="0">
																								<tbody><tr>
																									<td height="5" style="mso-line-height-rule:exactly; line-height:5px;">
																									</td>
																								</tr>
																								<tr>
                                                  <td align="left" valign="top" rowspan="2" width="60" style="padding-top: 10px">
																										 <img src="'.HOST_URL.'images/email-template/2.png" alt="One" width="60" style="margin:0; border:0; padding:0; display:block;">
																									</td>
																									<td align="left" valign="top" class="MsoNormal" style="color:#71026b; font-family:\'Roboto\', Arial, Helvetica Neue, Helvetica, sans-serif;font-size:20px; font-weight:700; letter-spacing:0.2px; line-height: 30px; padding-left: 15px" pardot-region="">
																										Assistance on-demand
																									</td>
																								</tr>
                                                <tr>
                                                  <td align="left" valign="top" class="MsoNormal" style="color:#29333D; font-family:\'Roboto\', Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px; font-weight:400; letter-spacing:0.2px; line-height: 28px; padding-top: 10px; padding-left: 15px" pardot-region="">
																										Need an appointment confirmed? Send us a follow-up request & Tara will place an outbound call on your behalf.
																									</td>
																								</tr>
																								<tr>
																									<td height="5" style="mso-line-height-rule:exactly; line-height:5px;">
																									</td>
																								</tr>
																							</tbody></table>
																						</td>
																					</tr>

																					<tr>
																						<td align="left">
																							<table align="left" border="0" width="100%" cellpadding="0" cellspacing="0">
																								<tbody><tr>
																									<td height="5" style="mso-line-height-rule:exactly; line-height:5px;">
																									</td>
																								</tr>
																								<tr>
                                                  <td align="left" valign="top" rowspan="2" width="60" style="padding-top: 10px">
																										 <img src="'.HOST_URL.'images/email-template/3.png" alt="One" width="60" style="margin:0; border:0; padding:0; display:block;">
																									</td>
																									<td align="left" valign="top" class="MsoNormal" style="color:#71026b; font-family:\'Roboto\', Arial, Helvetica Neue, Helvetica, sans-serif;font-size:20px; font-weight:700; letter-spacing:0.2px; line-height: 30px; padding-left: 15px" pardot-region="">
																									Stay up to date
																									</td>
																								</tr>
                                                <tr>
                                                  <td align="left" valign="top" class="MsoNormal" style="color:#29333D; font-family:\'Roboto\', Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px; font-weight:400; letter-spacing:0.2px; line-height: 28px; padding-top: 10px; padding-left: 15px" pardot-region="">
																										See real time call details, stats, customer history and detailed notes right on your mobile device.
																									</td>
																								</tr>
																								<tr>
																									<td height="5" style="mso-line-height-rule:exactly; line-height:5px;">
																									</td>
																								</tr>
																							</tbody></table>
																						</td>
																					</tr>

																					<tr>
																						<td height="20" style="mso-line-height-rule:exactly; line-height:20px;">&nbsp;
																							
																						</td>
																					</tr>



																				</tbody></table>
																			</div>
																			<!--[if mso]>
																			</td>
																		</tr>
																	</table>
																<![endif]-->
															</td>
														</tr>

												</tbody></table>
											</div>
											<!--[if mso]>
										</td>
									</tr>
								</table>
							<![endif]-->
					</td>
				</tr>
			</tbody>
		</table>


    <table align="center" bgcolor="#f7f9fb" border="0" cellpadding="0" cellspacing="0" width="100%">
			<tbody>
				<tr>
					<td align="center">
						<!--[if mso]>
								<table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="600" style="width: 600px;">
									<tr>
										<td align="center" valign="top" width="100%" style="max-width:600px;">
											<![endif]-->
											<div style="display:inline-block; width:100%; max-width:600px; vertical-align:top;" class="width600">
												<!-- ID:BG SECTION-1 -->
												<table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" class="display-width" width="100%" style="max-width:600px;">

														<tbody><tr>
															<td align="center" style="padding:20px 50px 20px 0px; border-top: 8px solid #f7f9fb;" class="res-padding">
																<!--[if mso]>
																	<table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="550" style="width:550px;">
																		<tr>
																			<td align="center">
																					<![endif]-->
																			<div style="display:inline-block; width:100%; max-width:550px; vertical-align:top;" class="width550">
																				<table align="left" border="0" class="display-width-inner" cellpadding="0" cellspacing="0" width="100%" style="max-width:550px;">
																					<tbody>

																					<tr pardot-repeatable="">
																						<td align="center" style="font-size:0px;" valign="middle">
																							<!--[if mso]>
																							<table  aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="100%" style="width:100%;">
																								<tr>
																									<td align="center" valign="middle" width="257">
																										<![endif]-->
																										<div style="display:inline-block; max-width:257px; vertical-align:middle; width:100%;" class="full-block-div">
																											<!-- TABLE LEFT -->
																											<table align="left" border="0" cellpadding="0" cellspacing="0" class="display-width-child" width="100%" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; max-width:100%; width:100%;">
																												<tbody><tr>
																													<td align="center" style="padding:0px 15px 0px 0px;" class="sm-prl-0">
																														<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;">
																															<tbody><tr>
																																<td align="left">
																																	<table align="left" width="100%" border="0" cellpadding="0" cellspacing="0">
																																		<tbody><tr>
																																			<td align="left" style="color:#54595F;" width="242">
																																				 <img pardot-region="REGIONIMG830842517" pardot-region-type="image" class="fullwidth" src="'.HOST_URL.'images/email-template/phone_call.png" alt="Call Now" width="242" height="auto" style="margin:0; border:0; padding:0; width:100%; max-width:100%; display:block; height:auto;">
																																			</td>
																																		</tr>
																																	</tbody></table>
																																</td>
																															</tr>
																														</tbody></table>
																													</td>
																												</tr>
																											</tbody></table>
																										</div>
																										<!--[if mso]>
																										</td>
																										<td align="center" valign="middle" width="292">
																											<![endif]-->
																										<div style="display:inline-block; max-width:292px; vertical-align:middle; width:100%;" class="full-block-div">
																											<!-- TABLE RIGHT -->
																											<table align="right" border="0" cellpadding="0" cellspacing="0" class="display-width-child" width="100%" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; max-width:100%; width:100%;">
																												<tbody><tr>
																													<td align="left" style="padding:20px 0px 20px 10px;" class="sm-prl-0">
																														<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;">
																															<tbody>
																															<tr>
																																<td align="left" class="MsoNormal" style="color:#71026b; font-family:\'Roboto\', Arial, Helvetica Neue, Helvetica, sans-serif; font-weight:700; font-size:40px; line-height:50px; letter-spacing:0px; mso-line-height-rule: exactly;" pardot-region="">
																																	 What happens next?
																																</td>
																															</tr>
																															<tr>
																																<td align="left" class="MsoNormal" style="color:#000000; font-family:\'Roboto\', Arial, Helvetica Neue, Helvetica, sans-serif; font-weight:400; font-size:16px; line-height:26px; letter-spacing:0px; mso-line-height-rule: exactly; padding:10px 0px 0px 0px;" pardot-region="">
																																	Within the next 24-hours one of our friendly, knowledgeable Onboarding Coordinators will call you at <span style="color:#32DD87;"> '.$email_array['phone'].'</span> to answer your questions. We\'ll also help get your calls forwarded to us.
																																</td>
																															</tr>
																														</tbody></table>
																													</td>
																												</tr>
																											</tbody></table>
																										</div>
																										<!--[if mso]>
																									</td>
																								</tr>
																							</table>
																							<![endif]-->
																						</td>
																					</tr>

																				</tbody></table>
																			</div>
																			<!--[if mso]>
																			</td>
																		</tr>
																	</table>
																<![endif]-->
															</td>
														</tr>

												</tbody></table>
											</div>
											<!--[if mso]>
										</td>
									</tr>
								</table>
							<![endif]-->
					</td>
				</tr>
			</tbody>
		</table>


		<table align="center" bgcolor="#f7f9fb" border="0" cellpadding="0" cellspacing="0" width="100%">
			<tbody>
				<tr>
					<td align="center">
						<!--[if mso]>
								<table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="600" style="width: 600px;">
									<tr>
										<td align="center" valign="top" width="100%" style="max-width:600px;">
											<![endif]-->
											<div style="display:inline-block; width:100%; max-width:600px; vertical-align:top;" class="width600">
												<!-- ID:BG SECTION-1 -->
												<table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" class="display-width" width="100%" style="max-width:600px;">

														<tbody><tr>
															<td align="center" style="padding:30px 50px 30px 50px; border-top: 8px solid #f7f9fb;" class="res-padding">
																<!--[if mso]>
																	<table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="500" style="width:500px;">
																		<tr>
																			<td align="center">
																					<![endif]-->
																			<div style="display:inline-block; width:100%; max-width:500px; vertical-align:top;" class="width500">
																				<table align="center" border="0" class="display-width-inner" cellpadding="0" cellspacing="0" width="100%" style="max-width:500px;">
																					<tbody><tr pardot-repeatable="">
																						<td height="30" style="mso-line-height-rule:exactly; line-height:30px;">&nbsp;
																							
																						</td>
																					</tr>
																					<tr pardot-repeatable="">
																						<td align="center" class="MsoNormal" style="color:#71026b; font-family:\'Roboto\', Arial, Helvetica Neue, Helvetica, sans-serif !important; font-weight:700; font-size:50px; line-height:60px; letter-spacing:0px;" pardot-region="">
																							In the meantime...
																						</td>
																					</tr>

																					<tr pardot-repeatable="">
																						<td height="15" style="mso-line-height-rule:exactly; line-height:15px;">&nbsp;
																							
																						</td>
																					</tr>

																					<tr pardot-repeatable="">
																						<td align="center" class="MsoNormal" style="color:#ffffff; font-family:\'Roboto\', Arial, Helvetica Neue, Helvetica, sans-serif !important; font-size:14px; font-weight:400; letter-spacing:0.2px;">
																							<a href="https://tarasoffice.com/" style="text-decoration: none">
																							<img src="'.HOST_URL.'images/email-template/500x360.jpg" pardot-region="REGIONIMG830842514" pardot-region-type="image" width="500" style="color:#000000;width:100%; height:auto; border-radius: 10px">
																							</a>
																						</td>
																					</tr>

																					<tr pardot-repeatable="">
																						<td height="20" style="mso-line-height-rule:exactly; line-height:20px;">&nbsp;
																							
																						</td>
																					</tr>

																					<tr pardot-repeatable="">
																						<td align="center" class="MsoNormal" style="color:#29333D; font-family:\'Roboto\', Arial, Helvetica Neue, Helvetica, sans-serif; font-weight:400; font-size:16px; line-height:26px; letter-spacing:0.2px; mso-line-height-rule: exactly;" pardot-region="">
																							Please log into taraville to help us learn a little but more about your business and what makes it awesome.
																						</td>
																					</tr>

																					<tr pardot-repeatable="">
																						<td height="20" style="mso-line-height-rule:exactly; line-height:20px;">&nbsp;
																							
																						</td>
																					</tr>

                                          <tr pardot-repeatable="">
																						<td align="center" class="MsoNormal" style="color:#29333D; font-family:\'Roboto\', Arial, Helvetica Neue, Helvetica, sans-serif; font-weight:400; font-size:16px; line-height:26px; letter-spacing:0.2px; mso-line-height-rule: exactly; padding-bottom:15px" pardot-region="">
                                              Username: '.$email_array['email'].'
																						</td>
																					</tr>

                                          <tr pardot-repeatable="">
																						<td align="center" class="MsoNormal" style="color:#29333D; font-family:\'Roboto\', Arial, Helvetica Neue, Helvetica, sans-serif; font-weight:400; font-size:16px; line-height:26px; letter-spacing:0.2px; mso-line-height-rule: exactly;" pardot-region="">
                                              Password: '.$email_array['password'].'
																						</td>
																					</tr>

                                          <tr pardot-repeatable="">
																						<td height="20" style="mso-line-height-rule:exactly; line-height:20px;">&nbsp;
																							
																						</td>
																					</tr>

																					<tr>
																						<td align="center" class="width-auto" style="padding:10px 0px">

																							<table align="center" bgcolor="#32dd87" border="0" cellspacing="0" cellpadding="0" class="width-auto hover-dark" style="border-radius:30px;">
																								<tbody><tr>
																									<td align="center" valign="middle" class="MsoNormal" style="color:#ffffff; font-family:\'Roboto\', Arial, Helvetica Neue, Helvetica, sans-serif !important; font-size:16px; font-weight:700; letter-spacing:0.2px; line-height:20px; padding:15px 45px;" pardot-region="">
																										 <a href="https://tarasoffice.com/" style="color:#ffffff; text-decoration:none;">Login Now</a>
																									</td>
																								</tr>
																							</tbody></table>
																						</td>
																					</tr>
																					<tr>
																						<td height="10" style="mso-line-height-rule:exactly; line-height:10px;">&nbsp;
																							
																						</td>
																					</tr>

																				</tbody></table>
																			</div>
																			<!--[if mso]>
																			</td>
																		</tr>
																	</table>
																<![endif]-->
															</td>
														</tr>

												</tbody></table>
											</div>
											<!--[if mso]>
										</td>
									</tr>
								</table>
							<![endif]-->
					</td>
				</tr>
			</tbody>
		</table>


    <table align="center" bgcolor="#f7f9fb" border="0" cellpadding="0" cellspacing="0" width="100%">
			<tbody>
				<tr>
					<td align="center">
						<!--[if mso]>
								<table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="600" style="width: 600px;">
									<tr>
										<td align="center" valign="top" width="100%" style="max-width:600px;">
											<![endif]-->
											<div style="display:inline-block; width:100%; max-width:600px; vertical-align:top;" class="width600">
												<!-- ID:BG SECTION-1 -->
												<table align="center" bgcolor="#ffba00" border="0" cellpadding="0" cellspacing="0" class="display-width" width="100%" style="max-width:600px;">

														<tbody><tr>
															<td align="center" style="padding:30px 30px 10px 30px; border-top: 8px solid #f7f9fb;" class="res-padding">
																<!--[if mso]>
																	<table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="540" style="width:540px;">
																		<tr>
																			<td align="center">
																					<![endif]-->
																			<div style="display:inline-block; width:100%; max-width:540px; vertical-align:top;" class="width540">
																				<table align="center" border="0" class="display-width-inner" cellpadding="0" cellspacing="0" width="100%" style="max-width:540px;">
																					<tbody><tr pardot-repeatable="">
																						<td height="30" style="mso-line-height-rule:exactly; line-height:30px;">&nbsp;
																							
																						</td>
																					</tr>
																					<tr pardot-repeatable="">
																						<td align="left" class="MsoNormal" style="color:#000000; font-family:\'Roboto\', Arial, Helvetica Neue, Helvetica, sans-serif !important; font-weight:700; font-size:50px; line-height:60px; letter-spacing:0.2px; text-align:left;" pardot-region="">
																						 What more can Tara do for you?
																						</td>
																					</tr>

																					<tr pardot-repeatable="">
																						<td height="20" style="mso-line-height-rule:exactly; line-height:20px;">&nbsp;
																							
																						</td>
																					</tr>

																				</tbody></table>
																			</div>
																			<!--[if mso]>
																			</td>
																		</tr>
																	</table>
																<![endif]-->
															</td>
														</tr>

												</tbody></table>
											</div>
											<!--[if mso]>
										</td>
									</tr>
								</table>
							<![endif]-->
					</td>
				</tr>
			</tbody>
		</table>

    <table align="center" bgcolor="#f7f9fb" border="0" cellpadding="0" cellspacing="0" width="100%">
			<tbody>
				<tr>
					<td align="center">
						<!--[if mso]>
								<table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="600" style="width: 600px;">
									<tr>
										<td align="center" valign="top" width="100%" style="max-width:600px;">
											<![endif]-->
											<div style="display:inline-block; width:100%; max-width:600px; vertical-align:top;" class="width600">
												<!-- ID:BG SECTION-1 -->
												<table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" class="display-width" width="100%" style="max-width:600px;">

														<tbody><tr>
															<td align="center" style="padding:30px 20px 30px 20px; border-bottom:3px solid #ffba00" class="res-padding">
																<!--[if mso]>
																	<table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="560" style="width:560px;">
																		<tr>
																			<td align="center">
																					<![endif]-->
																			<div style="display:inline-block; width:100%; max-width:560px; vertical-align:top;" class="width560">
																				<table align="center" border="0" class="display-width-inner" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;">
																					<tbody>

																					<tr pardot-repeatable="">
																					<td style="font-size:0px">
																						<table align="center" border="0" class="display-width" cellpadding="0" cellspacing="0" width="100%">
																							<tbody><tr>
																								<td align="center" class="disp-block" style="font-size:0;">
																									<!--[if mso]>
																									<table  aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="100%" style="width:100%;">
																										<tr>
																											<td align="center" valign="top" width="186">
																												<![endif]-->
																									<div style="display:inline-block; max-width:186px; vertical-align:top; width:100%;" class="div-width">
																										<!-- TABLE LEFT -->
																										<table align="left" border="0" cellpadding="0" cellspacing="0" class="display-width-child" width="100%" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; max-width:100%; width:100%;">
																											<tbody><tr>
																												<td align="center" style="padding:15px 10px;">
																													<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; max-width:100%; width:100%;">
																															<tbody>
																															<tr>
																																<td align="center">
                                                                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;">
                                                                    <tbody>
                                                                    <tr>
                                                                      <td align="left">
                                                                        <img src="'.HOST_URL.'images/email-template/02.png" alt="Download" width="70" style="margin:0; border:0; padding:0; display: block; width: 70px; max-width: 70px; height: auto;" pardot-region="REGIONIMG8308425115" pardot-region-type="image">
                                                                      </td>
                                                                    </tr>

                                                                    <tr>
                                                                      <td align="center" class="MsoNormal" style="color:#29333D; font-family:\'DM Sans\', Arial, Helvetica Neue, Helvetica, sans-serif; font-weight:400; font-size:15px; line-height:26px; letter-spacing:0px; mso-line-height-rule: exactly; padding:10px 0px 10px 0px; text-align:left" pardot-region="">
                                                                      Download our ultimate guide to virtual receptionists.
                                                                      </td>
                                                                    </tr>

                                                                    <tr>
                                                                      <td align="left" class="MsoNormal" style="color:#ffba00; font-family:\'DM Sans\', Arial, Helvetica Neue, Helvetica, sans-serif; font-weight:400; font-size:16px; line-height:21px; letter-spacing:0.2px; mso-line-height-rule: exactly; text-align:left" pardot-region="">
                                                                        <a href="https://tarasoffice.com/" style="text-decoration: none"><span style="color:#ffba00">Download Now</span> <img src="'.HOST_URL.'images/email-template/arrow.png" alt="polygon" width="15" style="margin:0; border:0; padding:0; display:inline-block !important;"></a>
                                                                      </td>
                                                                    </tr>
                                                                  </tbody></table>
                                                                </td>
																															</tr>
																														</tbody>
																													</table>
																												</td>
																											</tr>
																										</tbody></table>
																									</div>
																									<!--[if mso]>
																									</td>
																									<td align="center" valign="top" width="186">
																										<![endif]-->
																									<div style="display:inline-block; max-width:186px; vertical-align:top; width:100%;" class="div-width">
																										<!-- TABLE CENTER -->
																										<table align="left" border="0" cellpadding="0" cellspacing="0" class="display-width-child" width="100%" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; max-width:100%; width:100%;">
																											<tbody><tr>
																												<td align="center" style="padding:15px 10px;">
																												<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; max-width:100%; width:100%;">
																															<tbody>
																															<tr>
																																<td align="center">
                                                                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;">
                                                                    <tbody>
                                                                    <tr>
                                                                      <td align="left">
                                                                        <img src="'.HOST_URL.'images/email-template/01.png" alt="Case Study" width="70" style="margin:0; border:0; padding:0; display: block; width: 70px; max-width: 70px; height: auto;" pardot-region="REGIONIMG8308425115" pardot-region-type="image">
                                                                      </td>
                                                                    </tr>

                                                                    <tr>
                                                                      <td align="center" class="MsoNormal" style="color:#29333D; font-family:\'DM Sans\', Arial, Helvetica Neue, Helvetica, sans-serif; font-weight:400; font-size:15px; line-height:26px; letter-spacing:0px; mso-line-height-rule: exactly; padding:10px 0px 10px 0px; text-align:left" pardot-region="">
                                                                        Check out our case studies to learn how Tara helped businesses like yours.
                                                                      </td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td align="left" class="MsoNormal" style="color:#ffba00; font-family:\'DM Sans\', Arial, Helvetica Neue, Helvetica, sans-serif; font-weight:400; font-size:16px; line-height:21px; letter-spacing:0.2px; mso-line-height-rule: exactly; text-align:left" pardot-region="">
                                                                        <a href="https://tarasoffice.com/" style="text-decoration: none"><span style="color:#ffba00">Learn More</span> <img src="'.HOST_URL.'images/email-template/arrow.png" alt="polygon" width="15" style="margin:0; border:0; padding:0; display:inline-block !important;"></a>
                                                                      </td>
                                                                    </tr>
                                                                  </tbody></table>
                                                                </td>
																															</tr>
																														</tbody>
																													</table>
																												</td>
																											</tr>
																										</tbody></table>
																									</div>
																									<!--[if mso]>
																									</td>
																									<td align="center" valign="top" width="186">
																										<![endif]-->
																									<div style="display:inline-block; max-width:186px; vertical-align:top; width:100%;" class="div-width">
																										<!-- TABLE RIGHT -->
																										<table align="right" border="0" cellpadding="0" cellspacing="0" class="display-width-child" width="100%" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; max-width:100%; width:100%;">
																											<tbody><tr>
																												<td align="center" style="padding:15px 10px;">
																													<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; max-width:100%; width:100%;">
																															<tbody>
																															<tr>
																																<td align="center">
                                                                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;">
                                                                    <tbody>
                                                                    <tr>
                                                                      <td align="left">
                                                                        <img src="'.HOST_URL.'images/email-template/03.png" alt="Download" width="70" style="margin:0; border:0; padding:0; display: block; width: 70px; max-width: 70px; height: auto;" pardot-region="REGIONIMG8308425115" pardot-region-type="image">
                                                                      </td>
                                                                    </tr>

                                                                    <tr>
                                                                      <td align="center" class="MsoNormal" style="color:#29333D; font-family:\'DM Sans\', Arial, Helvetica Neue, Helvetica, sans-serif; font-weight:400; font-size:16px; line-height:26px; letter-spacing:0px; mso-line-height-rule: exactly; padding:10px 0px 10px 0px; text-align:left" pardot-region="">
                                                                        Need Answers? Check out our detailed FAQ.
                                                                      </td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td align="left" class="MsoNormal" style="color:#ffba00; font-family:\'DM Sans\', Arial, Helvetica Neue, Helvetica, sans-serif; font-weight:400; font-size:16px; line-height:21px; letter-spacing:0.2px; mso-line-height-rule: exactly; text-align:left" pardot-region="">
                                                                        <a href="https://tarasoffice.com/" style="text-decoration: none"><span style="color:#ffba00">Get Answers</span> <img src="'.HOST_URL.'images/email-template/arrow.png" alt="polygon" width="15" style="margin:0; border:0; padding:0; display:inline-block !important;"></a>
                                                                      </td>
                                                                    </tr>
                                                                  </tbody></table>
                                                                </td>
																															</tr>
																														</tbody>
																													</table>
																												</td>
																											</tr>
																										</tbody></table>
																									</div>
																									<!--[if mso]>
																										</td>
																									</tr>
																								</table>
																								<![endif]-->
																								</td>
																							</tr>
																						</tbody></table>
																					</td>
																				</tr>



																				</tbody></table>
																			</div>
																			<!--[if mso]>
																			</td>
																		</tr>
																	</table>
																<![endif]-->
															</td>
														</tr>

												</tbody></table>
											</div>
											<!--[if mso]>
										</td>
									</tr>
								</table>
							<![endif]-->
					</td>
				</tr>
			</tbody>
		</table>

    <table align="center" bgcolor="#f7f9fb" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tbody>
        <tr>
          <td align="center">
            <!--[if mso]>
                <table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="600" style="width: 600px;">
                  <tr>
                    <td align="center" valign="top" width="100%" style="max-width:600px;">
                      <![endif]-->
                      <div style="display:inline-block; width:100%; max-width:600px; vertical-align:top;" class="width600">
                        <!-- ID:BG SECTION-1 -->
                        <table align="center" bgcolor="#71026b" border="0" cellpadding="0" cellspacing="0" class="display-width" width="100%" style="max-width:600px;">

                            <tbody><tr>
                              <td align="center" style="padding:0px; border-top: 8px solid #f7f9fb" class="res-padding">
                                <!--[if mso]>
                                  <table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="600" style="width:600px;">
                                    <tr>
                                      <td align="center">
                                          <![endif]-->
                                      <div style="display:inline-block; width:100%; max-width:600px; vertical-align:top;" class="width600">
                                        <table align="left" border="0" class="display-width-inner" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                          <tbody>
                                          <tr pardot-repeatable="">
                                            <td align="left" class="MsoNormal" style="color:#ffffff; font-family:\'Roboto\', Arial, Helvetica Neue, Helvetica, sans-serif !important; font-size:14px; font-weight:400; letter-spacing:0.2px;">
                                              <a href="https://tarasoffice.com/" style="text-decoration: none">
                                              <img src="'.HOST_URL.'images/email-template/blog.jpg" pardot-region="REGIONIMG830842514" pardot-region-type="image" width="500" style="color:#000000;width:100%; height:auto;">
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody></table>
                                      </div>
                                      <!--[if mso]>
                                      </td>
                                    </tr>
                                  </table>
                                <![endif]-->
                              </td>
                            </tr>

                        </tbody></table>
                      </div>
                      <!--[if mso]>
                    </td>
                  </tr>
                </table>
              <![endif]-->
          </td>
        </tr>
      </tbody>
    </table>

		<table align="center" bgcolor="#f7f9fb" border="0" cellpadding="0" cellspacing="0" width="100%">
			<tbody>
				<tr>
					<td align="center">
						<!--[if mso]>
								<table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="600" style="width: 600px;">
									<tr>
										<td align="center" valign="top" width="100%" style="max-width:600px;">
											<![endif]-->
											<div style="display:inline-block; width:100%; max-width:600px; vertical-align:top;" class="width600">
												<!-- ID:BG SECTION-1 -->
												<table align="center" bgcolor="#71026b" border="0" cellpadding="0" cellspacing="0" class="display-width" width="100%" style="max-width:600px;">

														<tbody><tr>
															<td align="center" style="padding:30px 50px 30px 50px;" class="res-padding">
																<!--[if mso]>
																	<table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="500" style="width:500px;">
																		<tr>
																			<td align="center">
																					<![endif]-->
																			<div style="display:inline-block; width:100%; max-width:500px; vertical-align:top;" class="width500">
																				<table align="left" border="0" class="display-width-inner" cellpadding="0" cellspacing="0" width="100%" style="max-width:500px;">
																					<tbody><tr pardot-repeatable="">
																						<td height="20" style="mso-line-height-rule:exactly; line-height:20px;">&nbsp;
																							
																						</td>
																					</tr>

                                          <tr pardot-repeatable="">
																						<td align="left" class="MsoNormal" style="color:#ffffff; font-family:\'Roboto\', Arial, Helvetica Neue, Helvetica, sans-serif !important; font-weight:bold; font-size:46px; line-height:56px; letter-spacing:0px;" pardot-region="">
																							 We\'re Here For Businesses Like Yours!
																						</td>
																					</tr>
																					<tr pardot-repeatable="">
																						<td height="10" style="mso-line-height-rule:exactly; line-height:10px;">&nbsp;
																							
																						</td>
																					</tr>
																					<tr pardot-repeatable="">
																						<td align="left" class="MsoNormal" style="color:#ffffff; font-family:\'Roboto\', Arial, Helvetica Neue, Helvetica, sans-serif !important; font-weight:500; font-size:16px; line-height:28px; letter-spacing:0.2px; text-align: left" pardot-region="">
																							 To speak one of our top rated representative call (855) 628-9568 or email support@tarasoffice.com
																						</td>
																					</tr>


                                          <tr>
																						<td height="20" style="mso-line-height-rule:exactly; line-height:20px; font-size:0;">&nbsp;
																							
																						</td>
																					</tr>


																				</tbody></table>
																			</div>
																			<!--[if mso]>
																			</td>
																		</tr>
																	</table>
																<![endif]-->
															</td>
														</tr>

												</tbody></table>
											</div>
											<!--[if mso]>
										</td>
									</tr>
								</table>
							<![endif]-->
					</td>
				</tr>
			</tbody>
		</table>



		<table align="center" bgcolor="#f7f9fb" border="0" cellpadding="0" cellspacing="0" width="100%">
			<tbody>
				<tr>
					<td align="center">
						<!--[if mso]>
						<table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="600" style="width: 600px;">
							<tr>
								<td align="center" valign="top" width="100%" style="max-width:600px;">
									<![endif]-->
											<div style="display:inline-block; width:100%; max-width:600px; vertical-align:top;" class="width600">
												<table align="center" bgcolor="#f7f9fb" border="0" cellpadding="0" cellspacing="0" class="display-width" width="100%" style="max-width:600px;">
													<tbody>
														<tr>
															<td align="center" style="padding:50px 0px 50px 0px" class="res-padding">
																<!--[if mso]>
																<table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="600" style="width:600px;">
																	<tr>
																		<td align="center">
																				<![endif]-->
																				<div style="display:inline-block; width:100%; max-width:600px; vertical-align:top;" class="width600">
																					<table align="center" border="0" class="display-width-inner" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
																						<tbody>
																						<tr>
																							<td align="center" class="MsoNormal" style="" >
																								<table align="center" width="100%" border="0" cellspacing="0" cellpadding="0">
																								<tbody>
																									<tr>
																										<td align="left" valign="middle" style="color:#ffffff; font-family:\'Roboto\', Arial, Helvetica Neue, Helvetica, sans-serif !important; font-size:16px; font-weight:700; letter-spacing:0.2px; padding:10px 0px;" pardot-region="">
																											<img src="'.HOST_URL.'images/email-template/logo.png" alt="brand" width="130" style="margin:0; border:0; padding:0; display:inline-block !important; text-align: left">
																										</td>
																										<td align="right">
																											<table border="0" cellpadding="0" cellspacing="0" style="font-weight: 400 !important; text-align:right" align="right">
																												<tbody>
																													<tr>

																														<!-- Facebook -->
																														<td width="40" align="center" class="socialicon" style="font-weight: normal !important; padding: 2px;"><a href="https://www.facebook.ccom/taraoffice" target="_blank"><img alt="Facebook" src="'.HOST_URL.'images/email-template/fb.png" style="border-width: 0; height: auto; line-height: 100%; display: block; outline-style: none; text-decoration: none;" width="25" pardot-region="Facebook" pardot-region-type="link"> </a></td>


																														<!-- Twitter -->
																														<td width="40" align="center" class="socialicon" style="font-weight: normal !important; padding: 2px;"><a href="https://www.twitter.com/tarasoffice" target="_blank"><img alt="Twitter" src="'.HOST_URL.'images/email-template/tw.png" style="border-width: 0; height: auto; line-height: 100%; display: block; outline-style: none; text-decoration: none;" width="25" pardot-region="Twitter" pardot-region-type="link"> </a></td>


																														<!-- Instagram -->
																														<td width="40" align="center" class="socialicon" style="font-weight: normal !important; padding: 2px;"><a href="https://www.instagram.com/tarareceptionist" target="_blank"><img alt="Insta" src="'.HOST_URL.'images/email-template/insta.png" style="border-width: 0; height: auto; line-height: 100%; display: block; outline-style: none; text-decoration: none;" width="25" pardot-region="Youtube" pardot-region-type="link"> </a></td>
																													</tr>
																												</tbody>
																											</table>
																										</td>
																									</tr>


																									<tr>
																										<td align="left" colspan="2" class="MsoNormal" style="color:#697D8E; font-family:\'Roboto\', Arial, Helvetica Neue, Helvetica, sans-serif !important; font-weight:normal; font-size:13px; line-height:18px; letter-spacing:0px; padding:25px 0px 5px 0px;border-top: 2px solid #e1dced" pardot-region="">
                                                      &copy; Copyright 2021. Tarasoffice All Rights Reserved | 1802 N Alafaya Trail, Suite 1, Orlando, FL 32826
																										</td>
																									</tr>



                                                  <tr>
																										<td align="left" colspan="2" class="MsoNormal" style="color:#697D8E; font-family:\'Roboto\', Arial, Helvetica Neue, Helvetica, sans-serif !important; font-weight:normal; font-size:10px; line-height:15px; letter-spacing:0.2px; padding:5px 0px 10px 0px;" pardot-region="">
                                                      You have received this email because you are a user of Tarasoffice and have opted in when you created your account or signed up to receive our emails. If you no longer want to receive these emails, you can unsubscribe by replying to this email.
																										</td>
																									</tr>

																									<tr>
																										<td colspan="2" align="left" class="MsoNormal" style="color:#ffba00; font-family:\'Roboto\', Arial, Helvetica Neue, Helvetica, sans-serif !important; font-weight:normal; font-size:10px; line-height:15px; letter-spacing:0.2px; padding:10px 0px 0px 0px" pardot-region="">
																										<a href="https://tarasoffice.com/all-the-details.php" style="color:#ffba00;text-decoration: underline"><span style="color:#ffba00">FAQ\'s</span></a> &nbsp;  . &nbsp;  <a href="https://tarasoffice.com/terms-conditions.php" style="color:#ffba00;text-decoration: underline"><span style="color:#ffba00">Terms of Service</span></a> &nbsp; . &nbsp;  <a href="https://tarasoffice.com/privacy-policy.php" style="color:#ffba00;text-decoration: underline"><span style="color:#ffba00">Privacy Policy</span></a> &nbsp; . &nbsp;  <a href="https://tarasoffice.com/" style="color:#ffba00;text-decoration: underline"><span style="color:#ffba00">www.tarasoffice.com</span></a>
																										</td>
																									</tr>

																								</tbody>
																								</table>
																							</td>
																						</tr>

																					</tbody></table>
																				</div>
																				<!--[if mso]>
																			</td>
																		</tr>
																	</table>
																<![endif]-->
															</td>
														</tr>
												</tbody></table>
											</div>
											<!--[if mso]>
										</td>
									</tr>
								</table>
							<![endif]-->
					</td>
				</tr>
			</tbody>
		</table>

	</body>
</html>
';
  return $template;

}
?>