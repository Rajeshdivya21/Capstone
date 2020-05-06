package com.capstone.FMS.FeedbackManagementSystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.FMS.FeedbackManagementSystem.Model.Event;
import com.capstone.FMS.FeedbackManagementSystem.Model.EventList;
import com.capstone.FMS.FeedbackManagementSystem.Repository.EventListRepository;
import com.capstone.FMS.FeedbackManagementSystem.Repository.EventRepository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Authenticator;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

@Service
public class EventServiceImpl implements EventService {

	Session mailSession;
	private static String[] columns = { "event_id", "base_location", "beneficiary_name", "council_name", "event_name",
			"event_description", "event_date", "employee_id", "employee_name", "volunteer_hours", "travel_hours",
			"lives_impacted", "business_unit", "event_status", "iiep_category" };
	
	private static String[] eColumns = { "event_id", "month", "base_location", "beneficiary_name", "council_name", "event_name",
		 "event_date", "venue_address", "total_volunteers", "total_volunteer_hours", "travel_hours",
		 "business_unit", "event_status" };
	

	List<Event> reportOutput = new ArrayList<Event>();
	List<EventList> eventOutput = new ArrayList<EventList>();

	@Autowired
	public EventRepository eventRepo;
	
	@Autowired
	public EventListRepository eventListRepo;

	@Override
	public Flux<Event> getAllEventList() {
		Flux<Event> events = eventRepo.findAll();
		return events;
	}

	@Override
	public Flux<Event> searchEventsById(String eventId) {
		return eventRepo.findAllByEvent_id(eventId);
	}

	@Override
	public Flux<Event> searchEventsByVH(int volunteerHours) {
		return eventRepo.findAllByVolunteer_hours(volunteerHours);
	}
	
	@Override
	public Mono<Event> findEventById(int id) {
		return eventRepo.findById((long) id);
	}

	@Override
	public Mono<String> SendMail(String email,String type) {
		generateExcel(type);
		System.out.println("SimpleEmail Start");
		String smtpHostServer = "smtp.gmail.com";
		Properties props = System.getProperties();

		props.put("mail.smtp.host", smtpHostServer);
		props.put("mail.smtp.port", 587);// javax.mail.MessagingException: Could not connect to SMTP host:
											// smtp.gmail.com, port: 25, response: 421
		props.put("mail.smtp.starttls.enable", true);// add this line for this exception:
														// com.sun.mail.smtp.SMTPSendFailedException: 530 5.7.0 Must
														// issue a STARTTLS command first. a24sm8701871pfl.115 - gsmtp
		props.put("mail.smtp.ssl.trust", smtpHostServer);// this line of code is added for this error:
															// javax.mail.messagingexception could not convert socket to
															// tls nested exception is nested exception is:
		// javax.net.ssl.SSLHandshakeException:
		// sun.security.validator.ValidatorException: PKIX path building failed:
		// sun.security.provider.certpath.SunCertPathBuilderException: unable to find
		// valid certification path to requested target.
		props.put("mail.smtp.auth", true); // com.sun.mail.smtp.smtpsendfailedexception 530-5.7.0 authentication
											// required. this property and authenticator has to be added.
		Authenticator auth = new Authenticator() { // JAVAX.MAIL.AUTHENTICATIONFAILEDEXCEPTION: 535-5.7.8 USERNAME AND
													// PASSWORD NOT ACCEPTED--added when authentication failed and then
													// allow from lesssecureapps has to be done.
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication("krishnasvnc@gmail.com", "1234qwE$");
			}
		};
		Session session = Session.getInstance(props, auth);
		send(session, email, "Events Report", "Report of the events",type);
		return Mono.just("Report has been sent successfully. Please check your email");
	}

	public static void send(Session session, String toEmail, String subject, String body,String type) {
		try {
			MimeMessage msg = new MimeMessage(session);
			// set message headers
			msg.addHeader("Content-type", "text/HTML; charset=UTF-8");
			msg.addHeader("format", "flowed");
			msg.addHeader("Content-Transfer-Encoding", "8bit");
			msg.setFrom(new InternetAddress("krishnasvnc@gmail.com"));

			msg.setReplyTo(InternetAddress.parse(toEmail, false));
			msg.setSubject(subject, "UTF-8");
			msg.setText(body, "UTF-8");
			msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail, false));

			// To send a file as attachment, we need to create an object of
			// javax.mail.internet.MimeBodyPart and javax.mail.internet.MimeMultipart.
			// First add the body part for the text message in the email and then use
			// FileDataSource to attach the file in second part of the multipart body.
			BodyPart messageBodyPart = new MimeBodyPart();

			// Fill the message
			messageBodyPart.setText(body);

			// Create a multipart message for attachment
			Multipart multipart = new MimeMultipart();

			// Second part is attachment
			messageBodyPart = new MimeBodyPart();
			String filename = type.equals("report")? "Report.xlsx" : "Event.xlsx";
			DataSource source = new FileDataSource(filename);
			messageBodyPart.setDataHandler(new DataHandler(source));
			messageBodyPart.setFileName(filename);
			multipart.addBodyPart(messageBodyPart);

			// Send the complete message parts
			msg.setContent(multipart);

			System.out.println("Message is ready");
			Transport.send(msg);

			System.out.println("Email sent !!");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	@Override
	public Mono<String> generateExcel(String type) {
		Workbook workbook = new XSSFWorkbook();
		CreationHelper createHelper = workbook.getCreationHelper();
		String sheetName = type.equals("report") ? "Events Report" : "Events List";
		Sheet sheet = workbook.createSheet(sheetName);
		
		Font headerFont = workbook.createFont();
		headerFont.setBold(true);
		headerFont.setFontHeightInPoints((short) 14);
		headerFont.setColor(IndexedColors.BLUE_GREY.getIndex());
		
		CellStyle headerCellStyle = workbook.createCellStyle();
		headerCellStyle.setFont(headerFont);
		Row headerRow = sheet.createRow(0);
		
		CellStyle dateCellStyle = workbook.createCellStyle();
		dateCellStyle.setDataFormat(createHelper.createDataFormat().getFormat("dd-MM-yyyy"));
		
		if(type.equals("report")){
			reportOutput.clear();
			Flux<Event> values = eventRepo.findAll();
			values.subscribe((next) -> {
				reportOutput.add(next);
			},(err)->{},()->{
				copyToRExcel(reportOutput,headerRow,headerCellStyle,sheet,dateCellStyle).subscribe((n)->{
					closeWB(workbook,type);
				});
			});
		}else{
			eventOutput.clear();
			Flux<EventList> values = eventListRepo.findAll();
			values.subscribe((next) -> {
				eventOutput.add(next);
			},(err)->{},()->{
				copyToEExcel(eventOutput,headerRow,headerCellStyle,sheet,dateCellStyle).subscribe((n)->{
					closeWB(workbook,type);
				});
			});
		}
		return Mono.just("excel created");
	}
	
	private Mono<String> closeWB(Workbook workbook,String type){
		FileOutputStream fileOut;
		try {
			String fileName = type.equals("report") ? "Report.xlsx" : "Event.xlsx";
			fileOut = new FileOutputStream(fileName);
			workbook.write(fileOut);
			fileOut.close();
			workbook.close(); // Closing the workbook
		} catch (IOException e) {
			e.printStackTrace();
		};
		return Mono.just("closing workbook");
	}

	private Mono<String> copyToRExcel(List<Event> reportOutput, Row headerRow, CellStyle headerCellStyle, Sheet sheet, CellStyle dateCellStyle) {
		for (int i = 0; i < columns.length; i++) {
			Cell cell = headerRow.createCell(i);
			cell.setCellValue(columns[i]);
			cell.setCellStyle(headerCellStyle);
		}
		int rowNum = 1;
		for (Event eve : reportOutput) {
			Row row = sheet.createRow(rowNum++);

			row.createCell(0).setCellValue(eve.getEvent_id());
			row.createCell(1).setCellValue(eve.getBase_location());
			row.createCell(2).setCellValue(eve.getBeneficiary_name());
			row.createCell(3).setCellValue(eve.getCouncil_name());
			row.createCell(4).setCellValue(eve.getEvent_name());
			row.createCell(5).setCellValue(eve.getEvent_description());

			Cell dateOfBirthCell = row.createCell(6);
			dateOfBirthCell.setCellValue(eve.getEvent_date());
			dateOfBirthCell.setCellStyle(dateCellStyle);

			row.createCell(7).setCellValue(eve.getEmployee_id());
			row.createCell(8).setCellValue(eve.getEmployee_name());
			row.createCell(9).setCellValue(eve.getVolunteer_hours());
			row.createCell(10).setCellValue(eve.getTravel_hours());
			row.createCell(11).setCellValue(eve.getLives_impacted());
			row.createCell(12).setCellValue(eve.getBusiness_unit());
			row.createCell(13).setCellValue(eve.getEvent_status());
			row.createCell(14).setCellValue(eve.getIiep_category());
		}
		for (int i = 0; i < columns.length; i++) {
			sheet.autoSizeColumn(i);
		}
		return Mono.just("Excel created");
	}
	
	private Mono<String> copyToEExcel(List<EventList> eventOutput, Row headerRow, CellStyle headerCellStyle, Sheet sheet, CellStyle dateCellStyle) {
		for (int i = 0; i < eColumns.length; i++) {
			Cell cell = headerRow.createCell(i);
			cell.setCellValue(eColumns[i]);
			cell.setCellStyle(headerCellStyle);
		}
		int rowNum = 1;
		for (EventList eve : eventOutput) {
			Row row = sheet.createRow(rowNum++);

			row.createCell(0).setCellValue(eve.getEvent_id());
			row.createCell(1).setCellValue(eve.getMonth());
			row.createCell(2).setCellValue(eve.getBase_location());
			row.createCell(3).setCellValue(eve.getBeneficiary_name());
			row.createCell(4).setCellValue(eve.getCouncil_name());
			row.createCell(5).setCellValue(eve.getEvent_name());
			
			Cell dateOfBirthCell = row.createCell(6);
			dateOfBirthCell.setCellValue(eve.getEvent_date());
			dateOfBirthCell.setCellStyle(dateCellStyle);

			row.createCell(7).setCellValue(eve.getVenue_address());
			row.createCell(8).setCellValue(eve.getTotal_volunteers());
			row.createCell(9).setCellValue(eve.getTotal_volunteer_hours());
			row.createCell(10).setCellValue(eve.getTravel_hours());
			row.createCell(11).setCellValue(eve.getBusiness_unit());
			row.createCell(12).setCellValue(eve.getEvent_status());
		}

		for (int i = 0; i < eColumns.length; i++) {
			sheet.autoSizeColumn(i);
		}
		return Mono.just("Excel created");
	}

}
